import { createTemplateAction } from '@backstage/plugin-scaffolder-node';

/**
 * Creates an `acme:example` Scaffolder action.
 *
 * @remarks
 *
 * See {@link https://example.com} for more information.
 *
 * @public
 */
export function createExampleAction() {
  // For more information on how to define custom actions, see
  //   https://backstage.io/docs/features/software-templates/writing-custom-actions
  return createTemplateAction<{
    repoName: string;
    appId: string;
  }>({
    id: 'azure:federation',
    description: 'Creates federates credentials',
    schema: {
      input: {
        type: 'object',
        required: ['repoName'],
        properties: {
          repoName: {
            title: 'Repository Name',
            description: "Name of the repository",
            type: 'string',
          },
          appId: {
            title: 'Application Id',
            description: "Name of the application",
            type: 'string',
          }
        },
      },
    },
    async handler(ctx) {
      ctx.logger.info(

        `Running example template with parameters: ${ctx.input.repoName}`,






      );



      try {
        // Fetch the installations
        const response = await fetch('http://169.254.169.254/metadata/identity/oauth2/token?api-version=2020-06-01&resource=https://graph.microsoft.com/', {
          method: 'GET',
          headers: {
            'Metadata': 'true'
          },
        });
      
        if (response.ok) {
          const jsonResponse = await response.json();
          let access_token = jsonResponse.access_token;
          console.log("ACCESS TOKEN: " + access_token);
      
          // Perform the POST request using the fetched access token
          const postResponse = await fetch(`https://graph.microsoft.com/v1.0/applications/${ctx.input.appId}/federatedIdentityCredentials`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${access_token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: `${ctx.input.repoName}_federated_credential`,
              issuer: "https://login.microsoftonline.com/0dcd7d6a-ba5c-44b2-8858-b89a508cc2fd/v2.0",
              subject: `${ctx.input.repoName}:org/${ctx.input.repoName}:ref:refs/heads/main`,
              audiences: [
                "api://AzureADTokenExchange"
              ]
            })
          });
      
          if (postResponse.ok) {
            const postJsonResponse = await postResponse.json();
            console.log("POST Response:", postJsonResponse);
          } else {
            console.error("Failed to perform POST request:", postResponse.statusText);
          }
        } else {
          console.error('Failed to fetch installations:', response.statusText);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
      


      await new Promise(resolve => setTimeout(resolve, 1000));
    },
  });
}
