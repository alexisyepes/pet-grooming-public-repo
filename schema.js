const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
} = require("graphql");
const { GraphQLDateTime } = require("graphql-iso-date");
const db = require("./models");

const ClientType = new GraphQLObjectType({
  name: "Clients",
  fields: () => ({
    id: { type: GraphQLInt },
    registrationNumber: { type: GraphQLString },
    lastName: { type: GraphQLString },
    firstName: { type: GraphQLString },
    primaryPhoneNumber: { type: GraphQLString },
    cellphone: { type: GraphQLString },
    workPhone: { type: GraphQLString },
    email: { type: GraphQLString },
    Pets: {
      type: new GraphQLList(PetsType),
      resolve(parentValue, args) {
        return db.Pet.findAll({
          where: {
            ClientId: parentValue.id,
          },
        });
      },
    },
  }),
});

const PetsType = new GraphQLObjectType({
  name: "Pet",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    breed: { type: GraphQLString },
    type: { type: GraphQLString },
    petImg: { type: GraphQLString },
    notes: { type: GraphQLString },
    allowPhoto: { type: GraphQLBoolean },
    ClientId: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return db.Client.findOne({
          where: {
            id: parent.ClientId,
          },
        });
      },
    },
  }),
});

const CalendarAdminType = new GraphQLObjectType({
  name: "CalendarAdmin",
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    start: { type: GraphQLDateTime },
    end: { type: GraphQLDateTime },
    appointment: { type: GraphQLString },
    lastModifiedBy: { type: GraphQLString },
  }),
});

const CalendarEmp1Type = new GraphQLObjectType({
  name: "CalendarEmp1",
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    start: { type: GraphQLDateTime },
    end: { type: GraphQLDateTime },
    appointment: { type: GraphQLString },
    lastModifiedBy: { type: GraphQLString },
  }),
});

const CalendarEmp2Type = new GraphQLObjectType({
  name: "CalendarEmp2",
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    start: { type: GraphQLDateTime },
    end: { type: GraphQLDateTime },
    appointment: { type: GraphQLString },
    lastModifiedBy: { type: GraphQLString },
  }),
});

const CalendarCambridgePaolaType = new GraphQLObjectType({
  name: "CalendarCambridgePaola",
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    start: { type: GraphQLDateTime },
    end: { type: GraphQLDateTime },
    appointment: { type: GraphQLString },
    lastModifiedBy: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllCalendarsAdmin: {
      type: new GraphQLList(CalendarAdminType),
      resolve(parent, args) {
        return db.CalendarAdmin.findAll({});
      },
    },
    getAllCalendarsEmp1: {
      type: new GraphQLList(CalendarEmp1Type),
      resolve(parent, args) {
        return db.CalendarEmp1.findAll({});
      },
    },
    getAllCalendarsEmp2: {
      type: new GraphQLList(CalendarEmp2Type),
      resolve(parent, args) {
        return db.CalendarEmp2.findAll({});
      },
    },

    // C A M B R I D G E  - C A L E N D A R --  P A O L A --
    getAllCalendarsCambridgePaola: {
      type: new GraphQLList(CalendarCambridgePaolaType),
      resolve(parent, args) {
        return db.CalendarPaolaCambridge.findAll({});
      },
    },
    getAllClients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return db.Client.findAll({});
      },
    },
    getAllPets: {
      type: new GraphQLList(PetsType),
      resolve(parent, args) {
        return db.Pet.findAll({});
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  // mutation: Mutation,
});
