import { IBuildContext } from "./"

import { build } from "../schema"
import reporter from "gatsby-cli/lib/reporter"
import { createGraphQLRunner, Runner } from "../bootstrap/create-graphql-runner"

export async function buildSchema({
  store,
  parentSpan,
}: Partial<IBuildContext>): Promise<{
  graphqlRunner: Runner
}> {
  if (!store) {
    reporter.panic(`Cannot build schema before store initialization`)
  }
  const activity = reporter.activityTimer(`building schema`, {
    parentSpan,
  })
  activity.start()
  await build({ parentSpan: activity.span })
  activity.end()
  const graphqlRunner = createGraphQLRunner(store, reporter)
  return {
    graphqlRunner,
  }
}