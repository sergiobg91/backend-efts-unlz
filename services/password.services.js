import bcrypt from 'bcrypt';

const JUMP_ROUNDS = 10

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, JUMP_ROUNDS)
}

export const comparePassword = async (password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword)
}