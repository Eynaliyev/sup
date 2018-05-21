/*import { User } from "../models/models";
import { Message, Chatroom } from "../models/models";

export class Matcher {
constructor(){}
// check for otherGender waitlist - if empty,
// add to thisGender waitlist
// get a list of chatrooms.
//recursively querying for a larger diameter until we find enough chatrooms
getAvailableChatrooms(userCoords, radius){
	return this.geofire.getwithinRadius(userCoords, 50)
	.then(resArr => {
		//filter by users that you may have blocked or users who may have blocked you - if fewer than x left we go larger radius
		resArr.filter(chatroom => {
			let participants = chatroom.femaleParticipants.concat(chatroom.maleParticipants);
			participants.forEach.blocked(blockedUser => {
				return blockedUser.id !== user.id;
			});
		});
		if(resArr.length > 5){
			return resArr;
		} else {
			if(radius < 50000/10){
				this.getAvailableChatrooms(userCoords, radius*3);
			} else {
				return resArr;
			}
		}
	}).catch(err => console.log('error: ', err));
}
public chatrooms: [
    {
        id: '123',
        messages: [],
        maleParticipants: [],
        femaleParticipants: []
    },
    {
        id: '123',
        messages: [],
        maleParticipants: [],
        femaleParticipants: []
    }
];

this.getAvailableChatrooms(userCoords, 500).then(resArr => this.chatrooms = resArr);

// you have a stream of users that are trying to join the room sequentially

public const waitlist:Array<User> = [{
    id: '00',
    gender: 'male',
    latitude: '0123',
    longitude: '0123'
},
{
    id: '01',
    gender: 'female',
    latitude: '12321',
    longitude: '123431'
}];

public const oppositeGender;
//You want to get them to the chatroom with the number of users of
//opposite gender and less than users of your gender.
public const user: User;
this.user.gender === 'male' ? this.oppositeGender = 'femaleParticipanys' : oppositeGender = 'maleParticipants'

this.chatrooms.filter(chatroom => chatroom[oppositeGender].length < 3);

//sort by k nearest members which finds x nearest rooms by the central location of existing users in it
helperMidPoint(chatroom){
    let participants = chatroom.femaleParticipants.concat(chatroom.maleParticipants);
    let avgLong;
    let avgLat;
    participants.forEach(participant => {
        avgLong += participant.longitude;
        avgLat += participant.latitude;
    });
    avgLong /= participants.length;
    avgLat /= participants.lat;
}

distanceFromPoint(userCoords, chatroom){
	//geofire function
}

this.chatrooms
.map( chatroom => chatroom.centroid = this.helperMidPoint(chatroom))
.sort( chatroom => {
    this.distanceFromPoint(this.user, chatroom.centroid) - this.distanceFromPoint(this.user, chatroom);
.slice(0,5); // getting the first 5 chatrooms - number to be adjusted accordingly to user experience





If there’s an available one we add you if not
We add you to waitlist with a premium property boolean

Every time someone leaves a room a cloud function runs on that chat room and picks the next premium or if no premium exist next normal person or if 1 or no users left destroys the room

If maximum radius is reached and there are people of opposite gender and the x number of rooms aren’t found we create a new one

If there are 3 or more people on both sides of the gender waitlist we create a new room and auto add them there. - within chat rooms of the same small radius - cloud function that runs once a minute

The rooms auto destruct when there are no people left or one person left

someone leaving the chatroom triggers the cloud function that recomputes the centroid and picks the next person from the waitlist


matching needs to happen on the server -

maintain a lat long map of rooms and people that are
on the waitlist - joining a room just adds you to the
waitlist.

On the server, a cloud function, goes throughout the queu of waitlisted users
looking at their coordinates and the k nearest chatrooms

we maintain a que of users to know the order and map
to calculate the appropriate room easier



}

*/
