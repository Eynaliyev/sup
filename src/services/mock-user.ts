export let USER = {
  id:'1234',
  firstName: 'Rustam',
  lastName: 'Eynaliyev',
  relationshipStatus: 'single',
  universityName: 'Indiana University, Bloomington',
  birthday: '20/07/1992',
  gender: 'male',
  about: 'Creator of sup/Mypeeps',
  company: 'Luxoft',
  profession: 'Software Developer',
  currentLocation: 'Baku, Azerbaijan',
  currentCoords: [50.0647, 19.9450],
	age: 25,
	blockedList: [],
	friendRequests: [],
  contacts: [
    {
      id:'1234',
      name: 'Rustam Eynaliyev',
      profileImgUrl: 'assets/users/images/1/2.jpg',
      roomId: 'string',
      lastMessage: {
        content: "What's up my man?!",
        date: createDate(10000),
        id: '123',
        senderId: '432',
        roomId: '123',
        senderName: 'Ehmed',
        senderImage: 'aef',
        seen: []
      }
    },{
      id:'1223',
      name: 'Bahram Koroglu',
      profileImgUrl: 'assets/users/images/1/3.jpg',
      roomId: 'string',
      lastMessage: {
        content: "What's up my man?!",
        date: createDate(200000),
        id: '123',
        senderId: '432',
        roomId: '123',
        senderName: 'Ehmed',
        senderImage: 'aef',
        seen: ['1234']
      }
    },{
      id:'1114',
      name: 'Aflatun Aliyev',
      profileImgUrl: 'assets/users/images/1/4.jpg',
      roomId: 'string',
      lastMessage: {
        content: "What's up my man?!",
        date: createDate(500),
        id: '123',
        senderId: '432',
        roomId: '123',
        senderName: 'Ehmed',
        senderImage: 'aef',
        seen: ['124']
      }
    },{
      id:'1464',
      name: 'Angelo Alexander',
      profileImgUrl: 'assets/users/images/1/1.jpg',
      roomId: 'string',
      lastMessage: {
        content: "What's up my man?!",
        date: createDate(700000),
        id: '123',
        senderId: '432',
        roomId: '123',
        senderName: 'Ehmed',
        senderImage: 'aef',
        seen: ['123']
      }
    },{
      id:'6434',
      name: 'Kirito Maxilimillian',
      profileImgUrl: 'assets/users/images/1/2.jpg',
      roomId: 'string',
      lastMessage: {
        content: "What's up my man?!",
        date: new Date(),
        id: '123',
        senderId: '432',
        roomId: '123',
        senderName: 'Ehmed',
        senderImage: 'aef',
        seen: ['125']
      }
    }
  ],
  currentRoomId: '123',
  socialProfiles: [],
  profileImgUrl: 'assets/img/pic.png',
  photos: [
    { imgUrl: 'assets/users/images/1/1.jpg' },
    { imgUrl: 'assets/users/images/1/2.jpg' },
    { imgUrl: 'assets/users/images/1/3.jpg' },
    { imgUrl: 'assets/users/images/1/4.jpg' }
  ],
  interests: [],
  languages: [
    {
      id: '1',
      name: 'English'
    },
    {
      id: '2',
      name: 'Mandarin Chinese'
    }
  ]
};
//a dummy method for ocming up with different dates
function createDate(n){
  let time = new Date().getTime() - n;
  let date = new Date(time);
  return date;
}
