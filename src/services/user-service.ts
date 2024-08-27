type IncompleteUser = {
  name: string;
  friends: number[];
};

type User = {
  id: number;
  name: string;
  friends: number[];
};

export class UserService {
  static readonly USER_COUNT: number = 5_000;
  users: User[] = [];
  nextId: number = 1;

  async initialize() {
    this.createUsers(UserService.USER_COUNT);
  }

  getUserById(userId: number): User | undefined {
    const foundUser: User | undefined = this.users.find(u => u.id === userId);
    return foundUser;
  }

  createUser(userData: IncompleteUser): User {
    const newUser = {
      id: this.getNextId(),
      name: userData.name,
      friends: userData.friends
    };

    this.users.push(newUser);
    return newUser;
  }

  updateUser(userId: number, userData: IncompleteUser): User | undefined {
    const user = this.getUserById(userId);
    if (user) {
      user.name = userData.name;
      user.friends = userData.friends;
      return user;
    }
  }

  deleteUser(userId: number) {
    this.users = this.users.filter(u => u.id !== userId);
  }

  findFriendshipDegree(userId: number, friendId: number): number {
    // Run-of-the-mill BFS
    const visited = new Set<number>();
    const queue: [number, number][] = [[userId, 0]];

    while (queue.length > 0) {
      // cannot be null, as that would break the loop
      // I'm not a big fan of the non-null assertion operator
      // but I think it's justified here
      const [currentId, degrees] = queue.shift()!;

      if (currentId === friendId) {
        return degrees;
      }

      visited.add(currentId);
      const friends = this.getUserById(currentId)?.friends || [];

      for (const i of friends) {
        if (!visited.has(i)) {
          queue.push([i, degrees + 1]);
        }
      }
    }
    return -1;
  }

  private createRandomUser(index: number): User {
    const randomUser: IncompleteUser = {
      name: `user ${index}`,
      friends: []
    };

    return this.createUser(randomUser);
  }

  private async createUsers(count: number): Promise<User[]> {
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

  private getNextId(): number {
    const id = this.nextId;
    this.nextId++;
    return id;
  }
};