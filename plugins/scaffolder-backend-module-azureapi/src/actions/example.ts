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
        } else {
          console.error('Failed to fetch installations:', response.statusText);
          return; // Exit the function if the installations fetch fails
        }
      } catch (error) {
        console.error('An error occurred while fetching the access token:', error);
      }


      await new Promise(resolve => setTimeout(resolve, 1000));
    },
  });
}
