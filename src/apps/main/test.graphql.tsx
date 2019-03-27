export type GetProjectsQueryVariables = {};


export type GetProjectsQuery = ({ __typename?: 'Query' } & { projects: Array<({ __typename?: 'Project' } & Pick<GraphQL.Project, 'id' | 'name'> & { locations: Array<({ __typename?: 'Location' } & Pick<GraphQL.Location, 'name' | 'id' | 'create'> & { screens: GraphQL.Maybe<Array<({ __typename?: 'Screen' } & Pick<GraphQL.Screen, 'temperature'>)>> })> })>, roles: Array<({ __typename?: 'Role' } & Pick<GraphQL.Role, 'id' | 'name'>)> });

import { gql } from 'graphql.macro';
import * as React from 'react';
import * as ReactApollo from 'react-apollo';

export const GetProjectsDocument = gql`
    query GetProjects {
  projects(id: "1") {
    id
    name
    locations {
      name
      id
      create
      screens {
        temperature
      }
    }
  }
  roles {
    id
    name
  }
}
    `;

export class GetProjectsComponent extends React.Component<Partial<ReactApollo.QueryProps<GetProjectsQuery, GetProjectsQueryVariables>>> {
  render() {
      return (
          <ReactApollo.Query<GetProjectsQuery, GetProjectsQueryVariables> query={GetProjectsDocument} {...(this as any)['props'] as any} />
      );
  }
}