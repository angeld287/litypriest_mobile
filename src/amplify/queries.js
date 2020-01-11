/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getLocation = `query GetLocation($id: ID!) {
  getLocation(id: $id) {
    id
    name
    category {
      id
      name
      description
      module
    }
    contact {
      id
      name
      phone
      events {
        nextToken
      }
    }
  }
}
`;
export const listLocations = `query ListLocations(
  $filter: ModelLocationFilterInput
  $limit: Int
  $nextToken: String
) {
  listLocations(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      category {
        id
        name
        description
        module
      }
      contact {
        id
        name
        phone
      }
    }
    nextToken
  }
}
`;
export const getContact = `query GetContact($id: ID!) {
  getContact(id: $id) {
    id
    name
    phone
    events {
      items {
        id
      }
      nextToken
    }
  }
}
`;
export const listContacts = `query ListContacts(
  $filter: ModelContactFilterInput
  $limit: Int
  $nextToken: String
) {
  listContacts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      phone
      events {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getCategory = `query GetCategory($id: ID!) {
  getCategory(id: $id) {
    id
    name
    description
    module
  }
}
`;
export const listCategorys = `query ListCategorys(
  $filter: ModelCategoryFilterInput
  $limit: Int
  $nextToken: String
) {
  listCategorys(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
      module
    }
    nextToken
  }
}
`;
export const getEvent = `query GetEvent($id: ID!) {
  getEvent(id: $id) {
    id
      name,
      category{
        id
        name
        description
        module
      }
      date
      description
      location{
        id
        name
        category{
          id
          name
          description
          module
        }
        contact{
          id
          name
          phone
        }
      }
      contacts{
        items{
          id
          contact{
            id
            name
            phone
          }
        }
      }
      secretary
      priest
      duration
  }
}
`;
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
        module
      }
      date
      description
      location {
        id
        name
      }
      contacts {
        nextToken
      }
      secretary
      priest
      createdAt
      duration
    }
    nextToken
  }
}
`;
