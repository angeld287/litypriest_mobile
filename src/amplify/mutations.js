/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createLocation = `mutation CreateLocation($input: CreateLocationInput!) {
  createLocation(input: $input) {
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
export const updateLocation = `mutation UpdateLocation($input: UpdateLocationInput!) {
  updateLocation(input: $input) {
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
export const deleteLocation = `mutation DeleteLocation($input: DeleteLocationInput!) {
  deleteLocation(input: $input) {
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
export const createContact = `mutation CreateContact($input: CreateContactInput!) {
  createContact(input: $input) {
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
export const updateContact = `mutation UpdateContact($input: UpdateContactInput!) {
  updateContact(input: $input) {
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
export const deleteContact = `mutation DeleteContact($input: DeleteContactInput!) {
  deleteContact(input: $input) {
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
export const createCategory = `mutation CreateCategory($input: CreateCategoryInput!) {
  createCategory(input: $input) {
    id
    name
    description
    module
  }
}
`;
export const updateCategory = `mutation UpdateCategory($input: UpdateCategoryInput!) {
  updateCategory(input: $input) {
    id
    name
    description
    module
  }
}
`;
export const deleteCategory = `mutation DeleteCategory($input: DeleteCategoryInput!) {
  deleteCategory(input: $input) {
    id
    name
    description
    module
  }
}
`;
export const createEvent = `mutation CreateEvent($input: CreateEventInput!) {
  createEvent(input: $input) {
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
    contacts {
      items {
        id
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
export const updateEvent = `mutation UpdateEvent($input: UpdateEventInput!) {
  updateEvent(input: $input) {
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
    contacts {
      items {
        id
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
export const deleteEvent = `mutation DeleteEvent($input: DeleteEventInput!) {
  deleteEvent(input: $input) {
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
    contacts {
      items {
        id
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
export const createEventContacts = `mutation CreateEventContacts($input: CreateEventContactsInput!) {
  createEventContacts(input: $input) {
    id
    event {
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
export const updateEventContacts = `mutation UpdateEventContacts($input: UpdateEventContactsInput!) {
  updateEventContacts(input: $input) {
    id
    event {
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
export const deleteEventContacts = `mutation DeleteEventContacts($input: DeleteEventContactsInput!) {
  deleteEventContacts(input: $input) {
    id
    event {
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
