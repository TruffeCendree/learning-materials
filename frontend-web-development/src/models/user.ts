import newModel from 'node-asuran-db/lib/model'
import MySQLStore from '../mysql-store'
import UserPolicy from './policies/user.policy'
import UserRelation from './relations/user.relation'
import PrintableError from '../printable-error'

export default class User extends newModel<User>({ className: 'User', connection () { return MySQLStore.connection } }) {
  firstname: string
  lastname: string
  email: string
  passwordHash: string
  role: 'customer' | 'employee' | 'operator'

  static get policy (): UserPolicy { return new (require(`./policies/${__filename.split('/').pop().replace('.js', '')}.policy`).default)(this) }
  static get q (): UserRelation<User> { return new (require(`./relations/${__filename.split('/').pop().replace('.js', '')}.relation`).default)(this) }

  async onSaveFailedUniqEmail (action: 'create' | 'update', err: any) {
    if (err.message && /Duplicate entry.*email/.test(err.message)) throw new PrintableError(['This email address is already used.']);
  }
}

User.registerFieldString('firstname', 64)
User.registerFieldString('lastname', 64)
User.registerFieldString('email', 255, true)
User.registerFieldString('passwordHash', 128, true)
User.registerFieldEnum('role', ['customer', 'employee', 'operator'])

User.extraDdl.push('ALTER TABLE `User` ADD UNIQUE(`email`);')
