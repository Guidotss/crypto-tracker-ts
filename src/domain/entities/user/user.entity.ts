export class UserEntity { 
    private constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly lastName: string,
        public readonly email: string,
        public readonly password: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date
    ) {}
}