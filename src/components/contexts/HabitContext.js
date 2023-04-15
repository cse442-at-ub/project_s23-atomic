import { createContext, useState } from "react"
import axios from "axios";

const HabitContext = createContext()

export const HabitProvider = ({ children }) => {
   // hard coded habits that will be added to database
   // all habits should share this format
   // the database will have one table for now
   // users table: holds id (int), username, email, password, good_habits, bad_habits
   // good_habits and bad_habits is a json object that holds all the habits as objects
   // habits in users table should have a universal style in the application
   // for example one habit will contain other information
   // "Drink Water": {title: "Drink Water" ,"counter": 0, "total": 8, "details": "8 glasses a day is recommended for gut and skin health.","category":"health,"days":{}}
   // counter will be incremented up to the total number when logged by the user
   // days will look something like "Days": {7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {date: [date], counter: 0}}
   // where each integer key represents the day of the week and each value represents the counter for that day
   // the key 0 represents the current day and holds the current key and counter in order to correctly track days
   // on a new day, the counter information from key 0 will be moved up to 1 and 0 will be replaced with the new date and so on
   // this will represent a queue structure

   // need to save current date into preset habits
   // YYYY/MM/DD
   let separator = "/"
   let newDate = new Date();
   let date = newDate.getDate();
   let month = newDate.getMonth() + 1;
   let year = newDate.getFullYear();
   let current_date = `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`

   // this should never really change since it contains the preset habits
   const [good_habits, setGoodHabits] = useState({ 
      "Sleep 6-8 Hours": {"title":"Sleep 6-8 Hours","counter": 0, "total": 1, "details": "Getting enough sleep is vital to your health.", "category": "Health","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0} }},
      "Eat Breakfast": {"title":"Eat Breakfast","counter": 0, "total": 1, "details": "Eating breakfast everyday starts your day.","category":"Health","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Drink Water": {"title":"Drink Water","counter": 0, "total": 8, "details": "8 glasses a day is recommended for gut and skin health.","category":"Health","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Exercise": {"title":"Exercise","counter": 0, "total": 1, "details": "Exercise for at least 30 minutes a day. Go on a walk!","category":"Health","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Meditate": {"title":"Meditate","counter": 0, "total": 1, "details": "Ground your mind daily. Tap in.","category":"Health","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Journal": {"title":"Journal","counter": 0, "total": 1, "details": "Put whats on your mind on paper. It will help.","category":"Misc","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Digital Detox": {"title":"Digital Detox","counter": 0, "total": 1, "details": "Take a break from the internet. You will thank yourself later.","category":"Health","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Meal Prep": {"title":"Meal Prep","counter": 0, "total": 1, "details": "What are you eating tomorrow? Plan your meals.","category":"Health","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Eat Something Healthy": {"title":"Eat Something Healthy","counter": 0, "total": 6, "details": "Have a fruit. Or some vegetables. Get those vitamins.","category":"Health","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Explore Nature": {"title":"Explore Nature","counter": 0, "total": 1, "details": "Take a fresh breath of air outside. Say thanks to the trees.","category":"Health","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Self Care": {"title":"Self Care","counter": 0, "total": 1, "details": "You deserve to pamper yourself.","category":"Health","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Brush Your Teeth": {"title":"Brush Your Teeth","counter": 0, "total": 2, "details": "You can do this. Get that toothbrush!","category":"Health","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Take Your Medication": {"title":"Take Your Medication","counter": 0, "total": 1, "details": "Dont forget to take your meds!","category":"Health","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Stretch": {"title":"Stretch","counter": 0, "total": 1, "details": "Stretch your body for 5 minutes. Feel younger.","category":"Health","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Take Your Vitamins": {"title":"Take Your Vitamins","counter": 0, "total": 1, "details": "Vitamin C, D, E...all of them.","category":"Health","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Read": {"title":"Read","counter": 0, "total": 1, "details": "Pick up a good book. Reading 20 minutes a day is ideal.","category":"Misc","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Clean": {"title":"Clean","counter": 0, "total": 1, "details": "Clean your room. Or do the dishes. Clean something.","category":"Misc","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Arrive On Time": {"title":"Arrive On Time","counter": 0, "total": 1, "details": "Set your timers. You can make it on time.","category":"Work","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Organize Your Workspace": {"title":"Organize Your Workspace","counter": 0, "total": 1, "details": "Clutter ruins your work ethic. Organize your space.","category":"Work","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Manage Your Schedule": {"title":"Manage Your Schedule","counter": 0, "total": 1, "details": "Take control of your schedule. Plan your time.","category":"Work","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Help Your Teammates": {"title":"Help Your Teammates","counter": 0, "total": 1, "details": "Help each other out. Be a good teammate.","category":"Work","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Actively Listen To Others": {"title":"Actively Listen To Others","counter": 0, "total": 1, "details": "Be present in the moment. Listen to what others have to say.","category":"Work","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Accept Constructive Criticism": {"title":"Accept Constructive Criticism","counter": 0, "total": 1, "details": "Take the critcism and get better at something. I know its hard.","category":"Work","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Separate Work From Personal Life": {"title":"Separate Work From Personal Life","counter": 0, "total": 1, "details": "Work does not equal life. Find a balance.","category":"Work","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Dress Appropriately": {"title":"Dress Appropriately","counter": 0, "total": 1, "details": "Dress to impress. Look the part.","category":"Work","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Gossip Less": {"title":"Gossip Less","counter": 0, "total": 1, "details": "Stop gossipping about others. Reflect.","category":"Work","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Stop Procrastinating": {"title":"Stop Procrastinating","counter": 0, "total": 1, "details": "Get your work done on time. Work on your assignment piece by piece.","category":"Work","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Reach Out To Someone You Love": {"title":"Reach Out To Someone You Love","counter": 0, "total": 1, "details": "Tell someone about your day!","category":"Social","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Be Positive": {"title":"Be Positive","counter": 0, "total": 1, "details": "Limit those negative thoughts. Think about something positively.","category":"Social","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Beat Your Anxiety": {"title":"Beat Your Anxiety","counter": 0, "total": 1, "details": "Fight through it. You can do this!","category":"Social","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Ask For Help": {"title":"Ask For Help","counter": 0, "total": 1, "details": "You dont have to do everything alone. Ask for some help.","category":"Social","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Give Yourself A Compliment": {"title":"Give Yourself A Compliment","counter": 0, "total": 1, "details": "Youre amazing inside and out. Tell yourself something nice.","category":"Social","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Compliment A Stranger": {"title":"Compliment A Stranger","counter": 0, "total": 1, "details": "Spread kindness. Make someones day.","category":"Social","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Do Something That Scares You": {"title":"Do Something That Scares You","counter": 0, "total": 1, "details": "Face your fears.","category":"Social","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Take Class Notes": {"title":"Take Class Notes","counter": 0, "total": 1, "details": "Dont forget to take your notes.","category":"School","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Study": {"title":"Study","counter": 0, "total": 1, "details": "Study in intervals of 20 minutes. Feed your brain.","category":"School","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Work On Your Assignments": {"title":"Work On Your Assignments","counter": 0, "total": 1, "details": "Work on your assignments. Get them done on time.","category":"School","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Take A Wellness Break": {"title":"Take A Wellness Break","counter": 0, "total": 1, "details": "Dont forget you need a break. Relax your mind for a bit.","category":"School","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Spend Time With Your Loved Ones": {"title":"Spend Time With Your Loved Ones","counter": 0, "total": 1, "details": "Spend 30 minutes together. Dont neglect them.","category":"Family","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Show Your Love": {"title":"Show Your Love","counter": 0, "total": 1, "details": "Hug your loved ones. Tell them you love them.","category":"Family","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Eat Together": {"title":"Eat Together","counter": 0, "total": 3, "details": "Eating together strengthens your bond. Have a meal together.","category":"Family","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Be Active Together": {"title":"Be Active Together","counter": 0, "total": 1, "details": "Need some motivation? Exercise with each other.","category":"Family","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Set Goals": {"title":"Set Goals","counter": 0, "total": 1, "details": "Grow together. Build each other up.","category":"Family","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Listen To Each Other": {"title":"Listen To Each Other","counter": 0, "total": 1, "details": "Dont ignore them or their needs. Listen to what they have to say.","category":"Family","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Play A Game": {"title":"Play A Game","counter": 0, "total": 1, "details": "Play a game together. Play a short and friendly game.","category":"Family","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Save Money": {"title":"Save Money","counter": 0, "total": 1, "details": "Put 5 dollars everyday in your savings. Start building it up.","category":"Misc","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Learn Something New": {"title":"Learn Something New","counter": 0, "total": 1, "details": "Learn a new fact. Read a new book. Do something youve never done before.","category":"Misc","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Listen to Music": {"title":"Listen to Music","counter": 0, "total": 1, "details": "Dont forget to listen to your favorite music. Go to your happy place.","category":"Misc","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Reward Yourself": {"title":"Reward Yourself","counter": 0, "total": 1, "details": "You deserve to reward yourself. Life is hard.","category":"Misc","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},                   
   })

   const [bad_habits, setBadHabits] = useState({
      "Smoke": {"title":"Smoke","counter": 0, "total": 14, "details": "Smoking is hard to stop. Take small steps and try smoking less every day.", "category": "Health","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Drink Alcohol": {"title":"Drink Alcohol","counter": 0, "total": 5, "details": "Drink responsibly.","category":"Health","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Drink Coffee": {"title":"Drink Coffee","counter": 0, "total": 3, "details": "Who wouldve thought? Lower your caffeine intake.","category":"Health","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Eat Junk Food": {"title":"Eat Junk Food","counter": 0, "total": 8, "details": "Lower your junk food intake. You can do it.","category":"Health","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Sit All Day": {"title":"Sit All Day","counter": 0, "total": 1, "details": "Sitting is addicting. Go on a short walk or get up and clean.","category":"Health","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Bite Nails": {"title":"Bite Nails","counter": 0, "total": 5, "details": "A habit since childhood. Small steps.","category":"Misc","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Skip A Meal": {"title":"Skip A Meal","counter": 0, "total": 3, "details": "Dont forget to eat something. Even if its a snack.","category":"Health","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Multitask": {"title":"Multitask","counter": 0, "total": 6, "details": "Focus on one thing.","category":"Misc","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Criticize Yourself": {"title":"Criticize Yourself","counter": 0, "total": 5, "details": "You are capable of growth. No matter how big or small. Take a step towards loving yourself.","category":"Social","Social":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Binge Eat": {"title":"Binge Eat","counter": 0, "total": 6, "details": "Its okay. It happens. Take a minute to note why it happened.","category":"Health","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Overcommit Yourself": {"title":"Overcommit Yourself","counter": 0, "total": 5, "details": "You are one person. Dont overextend yourself.","category":"Social","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Gossip": {"title":"Gossip","counter": 0, "total": 5, "details": "Stop being a bully. Reflect.","category":"Social","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
      "Lying": {"title":"Lying","counter": 0, "total": 9, "details": "Take steps to being a more honest person. Lies build up.","category":"Social","Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0}}},
   })

   // user object to store user data
   const [user, setUser] = useState({
      id: 0,
      username: "",
      good: {},
      bad: {}
   })

   // functions to add a habit to user object
   const addGoodHabit = async (obj) => {
     user.good[obj["title"]] = obj;
   }
   const addBadHabit = async (obj) => {
      user.bad[obj["title"]] = obj;
   }

   // function to get user data from database
   // will replace user object with correct information
   // makes a get request to user.php with userid
   const getUserData = async(userid) => {
      let good_object = {};
      let bad_object = {};
      let username = "";

      await axios
      .get("http://localhost:8000/user.php?userid="+ userid)
      .then(function (response) {
         // successful call will replace user object with correct information
         // console.log("success");
         // console.log(response.data)

         const result_object = (response.data).split("\n");
         username = result_object[1];
         good_object = JSON.parse(result_object[2]);
         bad_object = JSON.parse(result_object[3]);
         // console.log(result_object[0]);
         // console.log(result_object[1]);
         // console.log(JSON.parse(result_object[2]));
         // console.log(JSON.parse(result_object[3]));

         setUser({
            ...user,
            id: userid,
            username: username,
            good: good_object,
            bad: bad_object
        });
        
      })
      .catch(function (error) {
            console.log("failed to send post request");
            console.log(error);
            console.log("error is "+ error.msg);
         });

         return {
            id: userid,
            username: username,
            good: good_object,
            bad: bad_object
         };
   };

   // function get user id and info from database using username
   const getID = async(username) => {
      let good_object = {};
      let bad_object = {};
      let userid = 0;

      await axios
      .get("http://localhost:8000/returnid.php?userid="+ username)
      .then(function (response) {
         // successful call will replace user object with correct information
         // console.log("success");
         console.log(response.data)

         const result_object = (response.data).split("\n");
         userid = result_object[1];
         good_object = JSON.parse(result_object[2]);
         bad_object = JSON.parse(result_object[3]);
         // console.log(result_object[0]);
         // console.log(result_object[1]);
         // console.log(JSON.parse(result_object[2]));
         // console.log(JSON.parse(result_object[3]));

         setUser({
            ...user,
            id: userid,
            username: username,
            good: good_object,
            bad: bad_object
        });
        
      })
      .catch(function (error) {
            console.log("failed to send post request");
            console.log(error);
            console.log("error is "+ error.msg);
         });

         return {
            id: userid,
            username: username,
            good: good_object,
            bad: bad_object
         };
   };

   // replaces habits in users database so it contains new habits
   const sendHabits = async(id, g, b) => {
      let result = true;
      await axios({
         method: "post",
         url: "http://localhost:8000/addhabit.php",
         data: {
            id: id,
            good_habits: g,
            bad_habits: b
         },
         }).then(function (response) {
            // successful call will replace user object with correct information
            console.log("success");
            console.log(response.data)
            console.log(response.config.data);
         }).catch(function (error) {
            console.log("failed to send post request");
            console.log(error);
            console.log("error is "+ error.msg);
            result = false;
         });
         return result;
   }

   // returns the provider with all the functions and objects
   return <HabitContext.Provider value = {{
      good_habits,
      setGoodHabits,
      bad_habits,
      setBadHabits,
      user,
      setUser,
      addGoodHabit,
      addBadHabit,
      sendHabits,
      getUserData,
      getID
   }}>
      {children}
   </HabitContext.Provider>
}

export default HabitContext