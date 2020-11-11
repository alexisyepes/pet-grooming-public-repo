import gql from "graphql-tag";

const getClientsQuery = gql`
  query Client {
    getAllClients {
      id
      lastName
      firstName
      primaryPhoneNumber
      cellphone
      workPhone

      Pets {
        id
        name
        breed
      }
    }
  }
`;

const getPetsQuery = gql`
  query Pet {
    getAllPets {
      id
      name
      breed
      type
      ClientId
    }
  }
`;

const getCalAdminQueryFiltered = gql`
  query CalendarAdmin {
    getAllCalendarsAdmin {
      id
      title
      start
      end
      appointment
      lastModifiedBy
    }
  }
`;

const getCalAdminQuery = gql`
  query CalendarAdmin {
    getAllCalendarsAdmin {
      id
      title
      start
      end
      appointment
      lastModifiedBy
    }
  }
`;

const getCalEmp1Query = gql`
  query Client {
    getAllCalendarsEmp1 {
      id
      title
      start
      end
      appointment
      lastModifiedBy
    }
  }
`;

const getCalEmp2Query = gql`
  query Client {
    getAllCalendarsEmp2 {
      id
      title
      start
      end
      appointment
      lastModifiedBy
    }
  }
`;

const getCalCambridgePaolaQuery = gql`
  query Client {
    getAllCalendarsCambridgePaola {
      id
      title
      start
      end
      appointment
      lastModifiedBy
    }
  }
`;

export {
  getCalCambridgePaolaQuery,
  getClientsQuery,
  getPetsQuery,
  getCalAdminQuery,
  getCalEmp1Query,
  getCalEmp2Query,
  getCalAdminQueryFiltered,
};
