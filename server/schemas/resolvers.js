// import user model
const { User } = require('../models');
// import sign token function from auth
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({
          $or: [{_id: context.user._id}, {username: context.user._id}]  
        });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  }
}