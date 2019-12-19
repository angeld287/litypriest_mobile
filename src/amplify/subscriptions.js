/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateLocation = `subscription OnCreateLocation {
  onCreateLocation {
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
export const onUpdateLocation = `subscription OnUpdateLocation {
  onUpdateLocation {
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
export const onDeleteLocation = `subscription OnDeleteLocation {
  onDeleteLocation {
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
export const onCreateContact = `subscription OnCreateContact {
  onCreateContact {
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
export const onUpdateContact = `subscription OnUpdateContact {
  onUpdateContact {
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
export const onDeleteContact = `subscription OnDeleteContact {
  onDeleteContact {
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
export const onCreateCategory = `subscription OnCreateCategory {
  onCreateCategory {
    id
    name
    description
  }
}
`;
export const onUpdateCategory = `subscription OnUpdateCategory {
  onUpdateCategory {
    id
    name
    description
  }
}
`;
export const onDeleteCategory = `subscription OnDeleteCategory {
  onDeleteCategory {
    id
    name
    description
  }
}
`;
export const onCreateEvent = `subscription OnCreateEvent {
  onCreateEvent {
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
      }
      nextToken
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
  }
}
`;
export const onUpdateEvent = `subscription OnUpdateEvent {
  onUpdateEvent {
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
      }
      nextToken
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
  }
}
`;
export const onDeleteEvent = `subscription OnDeleteEvent {
  onDeleteEvent {
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
      }
      nextToken
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
  }
}
`;
export const onCreateEventContacts = `subscription OnCreateEventContacts {
  onCreateEventContacts {
    id
    event {
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
        nextToken
      }
      contacts {
        nextToken
      }
      secretary
      priest
      createdAt
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
export const onUpdateEventContacts = `subscription OnUpdateEventContacts {
  onUpdateEventContacts {
    id
    event {
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
        nextToken
      }
      contacts {
        nextToken
      }
      secretary
      priest
      createdAt
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
export const onDeleteEventContacts = `subscription OnDeleteEventContacts {
  onDeleteEventContacts {
    id
    event {
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
        nextToken
      }
      contacts {
        nextToken
      }
      secretary
      priest
      createdAt
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
export const onCreateEventLocations = `subscription OnCreateEventLocations {
  onCreateEventLocations {
    id
    event {
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
        nextToken
      }
      contacts {
        nextToken
      }
      secretary
      priest
      createdAt
    }
    location {
      id
      name
      events {
        nextToken
      }
    }
  }
}
`;
export const onUpdateEventLocations = `subscription OnUpdateEventLocations {
  onUpdateEventLocations {
    id
    event {
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
        nextToken
      }
      contacts {
        nextToken
      }
      secretary
      priest
      createdAt
    }
    location {
      id
      name
      events {
        nextToken
      }
    }
  }
}
`;
export const onDeleteEventLocations = `subscription OnDeleteEventLocations {
  onDeleteEventLocations {
    id
    event {
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
        nextToken
      }
      contacts {
        nextToken
      }
      secretary
      priest
      createdAt
    }
    location {
      id
      name
      events {
        nextToken
      }
    }
  }
}
`;
