export const listEvents = `query ListEvents(
  $filter: ModelEventFilterInput
  $limit: Int
  $nextToken: String
) {
  listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      category {
        id
        name
        description
      }
      date
      description
      location {
        id
        name
      }
      contacts {
        items {
          contact{
            name
            phone
          }
        }
      }
      secretary
      priest
      createdAt
    }
    nextToken
  }
}
`;

export const getEvent = `query GetEvent($id: ID!) {
  getEvent(id: $id) {
    id
    name
    category {
      id
      name
      description
    }
    date
    description
    location {
      id
      name
    }
    contacts {
      items {
        contact{
          id
          name
          phone
        }
      }
      nextToken
    }
    secretary
    priest
    createdAt
    duration
  }
}
`;