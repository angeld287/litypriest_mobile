/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getLocation = `query GetLocation($id: ID!) {
  getLocation(id: $id) {
    id
    name
    events {
      items {
        id
      }
      nextToken
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
      events {
        nextToken
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
      items {
        id
        location{
          id
          name
        }
      }
 
    }
    contacts {
      items {
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
  }
}
`;
export const listEvents = `query ListEvents(
  $filter: ModelEventFilterInput
  $limit: Int
  $nextToken: String
) {
  listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items{
      id,
      name,
      date,
      description,
      category{
        name
      },
      location{
        items{
          id,
          location{
            name
          }
        }
      },
      contacts{
        items{
          contact{
            name,
            phone
          }
        }
      }
    }
    nextToken
  }
}
`;
