const user = ['USER']
const admin = ['ADMIN', 'SUPER']
const superAdmin = ['SUPER']

module.exports = {
     /**
     * @param {{ role: string; }} user
     */
    isSuper: (user) => superAdmin.includes(user.role),

     /**
     * @param {{ role: string; }} user
     */
    isAdmin: (user) => admin.includes(user.role),

     /**
     * @param {{ role: string; }} u
     */
    isUser: (u) => user.includes(u.role)
}