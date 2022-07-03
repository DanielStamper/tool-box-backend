// import { RESULT_CODES } from "mdo-backend-tools";

const core = "userCore";

const resolvers = {
  Query: {
    userList(parent, args, context) {
      return context[core].list(args);
    },
    userGet(parent, args, context) {
      return context[core].get(args);
    },
    userGetMany(parent, args, context) {
      return context[core].getMany(args);
    },
  },
  Mutation: {
    userCreate(parent, args, context) {
      return context[core].create(args);
    },
    userUpdate(parent, args, context) {
      return context[core].update(args);
    },
    userRemove(parent, args, context) {
      return context[core].remove(args);
    },
    userRemoveMany(parent, args, context) {
      return context[core].removeMany(args);
    },
  },
  User: {
    userCreated(parent /*, args, context */) {
      return { __typename: "User", id: parent.createdBy };
    },
    userUpdated(parent /*, args, context */) {
      return { __typename: "User", id: parent.updatedBy };
    },

    // // The "__resolveReference" function allows the "User" type to be references from other microservices.
    // async __resolveReference(reference, context) {
    //   if (!reference.id) {
    //     return null;
    //   }

    //   const result = await context[core].get({ id: reference.id });

    //   if (result && result.code === RESULT_CODES.OK) {
    //     return result.data && result.data[0];
    //   }

    //   return null;
    // },
  },
};

export default resolvers;
