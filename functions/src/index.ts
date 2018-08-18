import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

//i need to store latitudes and
// longitudes of user and chatroom locations
// when the user is logged in / or looking to join a room -
// do not allow if not returned the location
// when creating chatroom save in the separate list in firestore
// test function to tst that firebase functions are set up properly
exports.test = functions.https.onRequest((req, res) => {
	res.send("Firebase Cloud Function test passed");
});
//cloud function for creating user
exports.createProfile = functions.auth
	.user()
	.onCreate((userRecord, context) => {
		return admin
			.database()
			.ref(`/userProfile/${userRecord.uid}`)
			.set({
				email: userRecord.email,
				rest: userRecord
			});
	});
/*
	// gathering of info
	let relationshipsPromise = this.afs
	.collection(`relationships`)
	.doc(`${data.id}`)
	.collection(`user-id`).ref.get()
	.then(snapshot => {
		snapshot.forEach(doc => {
			console.log(doc.id, '=>', doc.data());
		});
	})
	.catch(err => {
		console.log('Error getting documents', err);
	});
let photosPromise = this.afs
	.doc(`/users/${data.id}`)
	.valueChanges()
	.toPromise();

	photosPromise
	.then((el: any) => {
		el["photos"].forEach(el => {
			user.photos.push({
				imgUrl: el.photoUrl
			});
		});
		return relationshipsPromise;
	})
	.then(relationships => {
		relationships.map((el: any) => el as any);
		let contacts = relationships.filter(
			el => el["relationshipType"] === "Friendship"
		);
		user.contacts = contacts.map((el: any) =>
			this.relationshipToContact(el)
		);
		let requests = relationships.filter(
			el =>
				el["relationshipType"] === "RequestSent" ||
				el["relationshipType"] === "RequestReceived" ||
				el["relationshipType"] === "BlockSent"
		);
		user.requests = requests.map(el => this.relationshipToRequest(el));
	});*/
/*
exports.joinChatroom = functions.database.ref(`waitlist/{userId}`)
    .onCreate((snapshot, context) => {
			//getting the opposite gender
				const gender = snapshot.val().gender;
				const oppositeGender = gender === 'male' ?  'femaleParticipants' : 'maleParticipants';
				const area;
				const user;
				// checking for nearest chatrooms
				// const userCoords = {
				// 	lat: event.data.latitude,
				// 	long: event.data.longitude
				// }
				// const chatrooms = getAvailableChatrooms(userCoords, 50)
				// .subcribe(res => res);


				// const messageValue = event.data.val();

        // const lowerCaseBody = messageValue.body.toLowerCase();

				// return event.data.ref.child('lowerCase').set(lowerCaseBody);
				const chatrooms = getLocations(area).slice(5);
				//adds you to waitlist on all of them
				chatrooms.array.forEach(element => {
					functions.database.ref(`chatrooms/${element.id}/waitlist`).push(user);
				});
				//keeping track of your waitlists to make removal easier
				const userWaitlistRef = firestore.ref(`users/${user.id}/waitlists`);
				userWaitlistRef.push(chatrooms);
		});

		//cloud function on runs on each chatroom once a person gets added
		exports.personAdded = functions.database.ref(`chatrooms/{chatroomId}/waitlist/{userId}`)
    .onCreate((snapshot, context) => {
			//getting the opposite gender
				const waitlist;
				const gender = snapshot.val().child('gender');
				const oppositeGender = gender === 'male' ?  'female' : 'male';
				let genderCount = 0;
				let oppositeGenderCount = 0;
				const roomRef = functions.database.ref('chatrooms/{chatroomId}');
				const waitlistRef = functions.database.ref('chatrooms/{chatroomId}/waitlist');
				//.subscribe(res => waitlist =res);
				//})
				// count numbers of people of different genders
				waitlist.forEach(user => {
					user.gender == 'male' ? genderCount++ : oppositeGenderCount++
				})
				// create a new room if we have more than 3 people on the waitlist of both genders
				if(oppositeGenderCount > 3 && genderCount > 3){
					exports.createNewRoom(waitlist);
				} else {
					//otherwise add the next user from the waitlist
					//- a transaction so that we do not have conflicts when multiple chatrooms open up simultaneously
					db.transaction(removeFromAllWaitlist && addToParticipants)
				}

		});
		exports.personLeft = functions.database.ref(`waitlist/{userId}`)
    .onWrite((snapshot, context) => {

			// leave chatroom
			// remov ethe user, if no users left, destroy the chatroom,
			// if 1 user left, add him to the waitlist with premium on.

			// otherwise add the next premium if there's one, or normal one from waitlist
			// recompute centroid


		});

		exports.getAvailableChatrooms = function(userCoords, radius){
			const area = calculateAra(userCoords, radius);
			let user;
			return getLocations(area)
			.then(resArr => {
				//filter by users that you may have blocked or users who may have blocked you - if fewer than x left we go larger radius
				resArr.filter(chatroom => {
					let participants = chatroom.femaleParticipants.concat(chatroom.maleParticipants);
					//filtering out rooms where you have been blocked
					participants.forEach.blocked(blockedUser => {
						return blockedUser.id !== user.id;
					});
				});
				// if there are less than n chatrooms within a radius, add to their waitlist, then create a room and add to it

				if(resArr.length > 5){
					return resArr;
				} else {
					if(radius < 50000/10){
						exports.getAvailableChatrooms(userCoords, radius*3);
					} else {
						return resArr;
					}
				}
			}).catch(err => console.log('error: ', err));
		}
		exports.createNewRoom = function(){
			//To do later
		};
		function calculateAra(userCoords, radius){
			// to do later
		}


//
//  * Get locations within a bounding box defined by a center point and distance from from the center point to the side of the box;
//  *
//  * @param {Object} area an object that represents the bounding box
//  *    around a point in which locations should be retrieved
//  * @param {Object} area.center an object containing the latitude and
//  *    longitude of the center point of the bounding box
//  * @param {number} area.center.latitude the latitude of the center point
//  * @param {number} area.center.longitude the longitude of the center point
//  * @param {number} area.radius (in kilometers) the radius of a circle
//  *    that is inscribed in the bounding box;
//  *    This could also be described as half of the bounding box's side length.
//  * @return {Promise} a Promise that fulfills with an array of all the
//  *    retrieved locations
//
function getLocations(area) {
  // calculate the SW and NE corners of the bounding box to query for
  const box = utils.boundingBoxCoordinates(area.center, area.radius);

  // construct the GeoPoints
  const lesserGeopoint = new GeoPoint(box.swCorner.latitude, box.swCorner.longitude);
  const greaterGeopoint = new GeoPoint(box.neCorner.latitude, box.neCorner.longitude);

  // construct the Firestore query
  let query = firebase.firestore().collection('chatroomLocations').where('location', '>', lesserGeopoint).where('location', '<', greaterGeopoint);

  // return a Promise that fulfills with the locations
  return query.get()
    .then((snapshot) => {
      const allLocs = []; // used to hold all the loc data
      snapshot.forEach((loc) => {
        // get the data
        const data = loc.data();
        // calculate a distance from the center
        data.distanceFromCenter = utils.distance(area.center, data.location);
        // add to the array
        allLocs.push(data);
      });
      return allLocs;
    })
    .catch((err) => {
      return new Error('Error while retrieving events');
    });
}

//
//  * Calculates the distance, in kilometers, between two locations, via the
//  * Haversine formula. Note that this is approximate due to the fact that
//  * the Earth's radius varies between 6356.752 km and 6378.137 km.
//  *
//  * @param {Object} location1 The first location given as .latitude and .longitude
//  * @param {Object} location2 The second location given as .latitude and .longitude
//  * @return {number} The distance, in kilometers, between the inputted locations.
//
distance(location1, location2) {
  const radius = 6371; // Earth's radius in kilometers
  const latDelta = degreesToRadians(location2.latitude - location1.latitude);
  const lonDelta = degreesToRadians(location2.longitude - location1.longitude);

  const a = (Math.sin(latDelta / 2) * Math.sin(latDelta / 2)) +
          (Math.cos(degreesToRadians(location1.latitude)) * Math.cos(degreesToRadians(location2.latitude)) *
          Math.sin(lonDelta / 2) * Math.sin(lonDelta / 2));

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return radius * c;
}
//
//  * Calculates the SW and NE corners of a bounding box around a center point for a given radius;
//  *
//  * @param {Object} center The center given as .latitude and .longitude
//  * @param {number} radius The radius of the box (in kilometers)
//  * @return {Object} The SW and NE corners given as .swCorner and .neCorner
//
boundingBoxCoordinates(center, radius) {
  const KM_PER_DEGREE_LATITUDE = 110.574;
  const latDegrees = radius / KM_PER_DEGREE_LATITUDE;
  const latitudeNorth = Math.min(90, center.latitude + latDegrees);
  const latitudeSouth = Math.max(-90, center.latitude - latDegrees);
  // calculate longitude based on current latitude
  const longDegsNorth = metersToLongitudeDegrees(radius, latitudeNorth);
  const longDegsSouth = metersToLongitudeDegrees(radius, latitudeSouth);
  const longDegs = Math.max(longDegsNorth, longDegsSouth);
  return {
    swCorner: { // bottom-left (SW corner)
      latitude: latitudeSouth,
      longitude: wrapLongitude(center.longitude - longDegs),
    },
    neCorner: { // top-right (NE corner)
      latitude: latitudeNorth,
      longitude: wrapLongitude(center.longitude + longDegs),
    },
  };
}
//
//  * Calculates the number of degrees a given distance is at a given latitude.
//  *
//  * @param {number} distance The distance to convert.
//  * @param {number} latitude The latitude at which to calculate.
//  * @return {number} The number of degrees the distance corresponds to.
//
function metersToLongitudeDegrees(distance, latitude) {
  const EARTH_EQ_RADIUS = 6378137.0;
  // this is a super, fancy magic number that the GeoFire lib can explain (maybe)
  const E2 = 0.00669447819799;
  const EPSILON = 1e-12;
  const radians = degreesToRadians(latitude);
  const num = Math.cos(radians) * EARTH_EQ_RADIUS * Math.PI / 180;
  const denom = 1 / Math.sqrt(1 - E2 * Math.sin(radians) * Math.sin(radians));
  const deltaDeg = num * denom;
  if (deltaDeg < EPSILON) {
    return distance > 0 ? 360 : 0;
  }
  // else
  return Math.min(360, distance / deltaDeg);
}
//
//  * Wraps the longitude to [-180,180].
//  *
//  * @param {number} longitude The longitude to wrap.
//  * @return {number} longitude The resulting longitude.
//
function wrapLongitude(longitude) {
  if (longitude <= 180 && longitude >= -180) {
    return longitude;
  }
  const adjusted = longitude + 180;
  if (adjusted > 0) {
    return (adjusted % 360) - 180;
  }
  // else
  return 180 - (-adjusted % 360);
}
function degreesToRadians(degrees) {
	return (degrees * Math.PI)/180;
}
*/
