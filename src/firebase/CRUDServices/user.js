export default class User {
    /**
     * Private fields for user object.
     */
    #id;
    #username;
    #password;
    #firstName;
    #lastName;
    #email;
    #role;
    /**
     * A constructor to create a User object.
     *
     * @param {String} email email of the user.
     * @param {String} password password of the user.
     */
    constructor(email, password) {
      this.#email = email;
      this.#password = password;
    }
    /**
     * Setter for id of the user.
     * @param {int} id user id of the user.
     */
    set id(id) {
      this.#id = id;
    }
    /**
     * Return the id of this user.
     */
    get id() {
      return this.#id;
    }
    /**
     * Setter for username of the user.
     * @param {String} username username of the user.
     */
    set username(username) {
      this.#username = username;
    }
    /**
     * Return the username of this user.
     */
    get username() {
      return this.#username;
    }
    /**
     * Setter for password of the user.
     * @param {String} password password of the user.
     */
    set password(password) {
      this.#password = password;
    }
    /**
     * Return the password of this user.
     */
    get password() {
      return this.#password;
    }
    /**
     * Setter for firstName of the user.
     * @param {String} firstName firstName of the user.
     */
    set firstName(firstName) {
      this.#firstName = firstName;
    }
    /**
     * Return the firstName of this user.
     */
    get firstName() {
      return this.#firstName;
    }
    /**
     * Setter for lastName of the user.
     * @param {String} lastName lastName of the user.
     */
    set lastName(lastName) {
      this.#lastName = lastName;
    }
    /**
     * Return the lastName of this user.
     */
    get lastName() {
      return this.#lastName;
    }
    /**
     * Setter for email of the user.
     * @param {String} email email of the user.
     */
    set email(email) {
      this.#email = email;
    }
    /**
     * Return the email of this user.
     */
    get email() {
      return this.#email;
    }
    /**
     * Setter for role of the user.
     * @param {int} role user role of the user. 0 represents participants.
     *                   1 represents researcher. 2 represents administrator.
     */
    set role(role) {
      this.#role = role;
    }
    /**
     * Return the role of this user.
     */
    get role() {
      return this.#role;
    }
}
