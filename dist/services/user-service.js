"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
class UserService {
    constructor() {
        this.users = [];
        this.nextId = 1;
    }
    async initialize() {
        this.createUsers(UserService.USER_COUNT);
    }
    getUserById(userId) {
        const foundUser = this.users.find(u => u.id === userId);
        return foundUser;
    }
    createUser(userData) {
        const newUser = {
            id: this.getNextId(),
            name: userData.name,
            friends: userData.friends
        };
        this.users.push(newUser);
        return newUser;
    }
    updateUser(userId, userData) {
        const user = this.getUserById(userId);
        if (user) {
            user.name = userData.name;
            user.friends = userData.friends;
            return user;
        }
    }
    deleteUser(userId) {
        this.users = this.users.filter(u => u.id !== userId);
    }
    findFriendshipDegree(userId, friendId) {
        var _a;
        // Run-of-the-mill BFS
        const visited = new Set();
        const queue = [[userId, 0]];
        while (queue.length > 0) {
            // cannot be null, as that would break the loop
            // I'm not a big fan of the non-null assertion operator
            // but I think it's justified here
            const [currentId, degrees] = queue.shift();
            if (currentId === friendId) {
                return degrees;
            }
            visited.add(currentId);
            const friends = ((_a = this.getUserById(currentId)) === null || _a === void 0 ? void 0 : _a.friends) || [];
            for (const i of friends) {
                if (!visited.has(i)) {
                    queue.push([i, degrees + 1]);
                }
            }
        }
        return -1;
    }
    createRandomUser(index) {
        const randomUser = {
            name: `user ${index}`,
            friends: []
        };
        return this.createUser(randomUser);
    }
    async createUsers(count) {
        for (let i = 0; i < count; i++) {
            this.createRandomUser(i);
        }
        for (let i = 0; i < count; i++) {
            const user = this.users[i];
            const friends = this.users.filter(u => u.id !== user.id).map(u => u.id);
            const shuffled = friends.sort(() => 0.5 - Math.random());
            user.friends = shuffled.slice(0, 20).sort();
        }
        return this.users;
    }
    getNextId() {
        const id = this.nextId;
        this.nextId++;
        return id;
    }
}
exports.UserService = UserService;
UserService.USER_COUNT = 5000;
;
