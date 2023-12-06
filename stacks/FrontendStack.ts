import { StackContext, StaticSite, use } from "sst/constructs";
import { ApiStack } from "./ApiStack";


export function FrontendStack({ stack, app }: StackContext) {
  const { api } = use(ApiStack);

  const site = new StaticSite(stack, "ReactSite", {
    path: "packages/frontend",
    buildCommand: "pnpm run build",
    buildOutput: "dist",
    environment: {
      VITE_API_URL: api.url,
      VITE_REGION: app.region,
    },
  });

  stack.addOutputs({
    SiteUrl: site.url,
  });

  return {
    site,
  }
}
