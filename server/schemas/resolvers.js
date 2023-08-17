// import user model
const { User } = require('../models');
// import sign token function from auth
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({
          $or: [{ _id: context.user._id }, { username: context.user._id }]
        });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user)

      return { token, user }
    },
    login: async (parent, { email, username, password }) => {
      const user = await User.findOne({ $or: [{ email }, { username }] });

      if (!user) {
        throw new AuthenticationError('No user with this email found');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Your password is incorrect')
      }

      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, { authors, description, title, bookId, image, link }, context) => {
      return User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { savedBooks: { authors, description, title, bookId, image, link } } },
        {
          new: true,
          runValidators: true,
        }
      )
    },
    deleteBook: async (parent, { bookId }, context) => { 
      return User.findOneAndUpdate( 
        { _id: context.user._id },
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      )
    }
  }
}