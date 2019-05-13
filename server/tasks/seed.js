const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const eventData = data.events;
const userData = data.usersFirebase;

const main = async () => {
	const db = await dbConnection();
  	await db.dropDatabase();

	//sign up a new account
	var uid1 = "3MEqtUlEH7Po4DnjCvQY7Mivmg13";
	var uid2 = "tRrLCp4LnGRY8kOssWAj4lfgFZn2";
	const test_user1 = await userData.addUser("sheeryachavan@gmail.com", "sheeryachavan@gmail.com", uid1,"Test_Account1", "2123216666", [], []);
	const test_user2 = await userData.addUser("shreesh.chavan@gmai.com", "shreesh.chavan@gmai.com", uid2,"Test_Account2", "2123217777", [], []);
	const user_id1 = test_user1.user_id;
	const user_id2 = test_user2.user_id;

  	//create event
  	const Texas_poker = await eventData.addEvent(
		"Texas_poker", 
		"game", 
		"Let's play Texas pokers. It's on 5th ave and time is ...",
		"NewYork", 
		"2019/05/11", //event_data
		"2019/05/11", //event_begin
		"2019/05/13", //event_end
		user_id1, 
		"sheeryachavan@gmail.com", 
		"2123216666", 
		"sheeryachavan@gmail.com",		
		[],
		50, 
		["card","New York"]
	  ); 
	await userData.ownEventById(user_id1,Texas_poker.event_id);

	const Meditation= await eventData.addEvent(
		"Meditation", 
		"outdoor", 
		"Let's meditation. It's...",
		"NewYork", 
		"2019/06/11", //event_data
		"2019/06/11", //event_begin
		"2019/06/13", //event_end
		user_id2, 
		"shreesh.chavan@gmai.com", 
		"2123217777", 
		"shreesh.chavan@gmai.com",		
		[],
		20, 
		["meditation","pressure","relax"]
  	); 
	await userData.ownEventById(user_id2,Meditation.event_id);

	const Boxing = await eventData.addEvent(
		"Boxing Training", 
		"workout", 
		"Let's boxing. It's...",
		"Hoboken", 
		"2020/04/11", //event_data
		"2020/04/11", //event_begin
		"2020/04/13", //event_end
		user_id2, 
		"shreesh.chavan@gmai.com", 
		"2123217777", 
		"shreesh.chavan@gmai.com",		
		[],
		10, 
		["boxing","gym","workout"]
  	);
	await userData.ownEventById(user_id2,Boxing.event_id);

	await userData.joinEventById(user_id1, Meditation.event_id);
	Meditation.event_joiners.push(user_id1);
	await eventData.updateEventById(Meditation.event_id,Meditation);

	await userData.joinEventById(user_id1, Boxing.event_id);
	Boxing.event_joiners.push(user_id1);
	await eventData.updateEventById(Boxing.event_id,Boxing);

	await userData.joinEventById(user_id2, Texas_poker.event_id);
	Texas_poker.event_joiners.push(user_id2);
	await eventData.updateEventById(Texas_poker.event_id,Texas_poker);

  	console.log("Done seeding database");
  	await db.serverConfig.close();
}

main().catch(console.log);







