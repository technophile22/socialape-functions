//this file is created to show how our data will look like
//no implications of this code whatsoever

let db = {
    users: [
        {
            userId: 'fherbjhbsbrbfu3bebuy43rh487ty',
            email: 'user@gmail.com',
            handle: 'user',
            createdAt: 'some random date',
            imageUrl: 'image/djbdjbvjhfdavhjfbvjbdv/dvfvfaj',
            bio: 'Hello, my name is user, nice to screem',
            website: 'https://user.com',
            location: 'london, UK'
        }
    ],
    screams: [
        {
            userHandle: 'user',
            body: 'this is the scream body',
            createdAt: 'some random date',
            likeCount: 5,
            commentCount: 2
        }
    ]
};
//#notes
//firebaseConfig is used in place of config for user authentication

const userDetails = {
    //redux data
    credentials: {
        userId: 'dfvjkndfjvkjdbvjbfdjvb',
        email: 'user@email.com',
        handle: 'user',
        createdAt: 'some random date',
        imageUrl: 'image/djbdjbvjhfdavhjfbvjbdv/dvfvfaj',
        bio: 'Hello, my name is user, nice to screem',
        website: 'https://user.com',
        location: 'london, UK'
    },
    likes: [
        {
            userHanle: 'user',
            screamId: 'dfvnfdnvjkfdnvlknd'
        },
        {
            userHandle: 'user',
            screamId: 'djcjdbkvjkdbfvhjbsbf'
        }
    ]
};