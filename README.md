# Forcast | Web Dev (frontend) Assignment 2023 by Anurag Kochar

# ✨ Features :
1. Create with email, password, and Username
2. Update your username
3. Create Chat Rooms
4. Send / recieve messages in realtime inside a room
5. Delete your messages.
6. Fully Responsive design.  

# Links
1. Live Site - https://forcast-chat-app.vercel.app/
2. Product Demo Video - https://youtu.be/yAJhX1ZKS2k

# 🌐 Tech stack :
1. React JS (vite)
2. TypeScript
3. Tailwind CSS
4. Supabase

# 🧱 Reusable Components :

## Button

| Prop      | Description                                                                 | Type                               |
| --------- | --------------------------------------------------------------------------- | ---------------------------------- |
| children* | Button Text                                                                 | React node                         |
| variant*  | Contained, Outlined or Text                                                 | string - PRIMARY or SECONDARY      |
| color*    | Use color prop to apply theme color palette to component                    | string                             |
| disabled  | For disabling button                                                        | boolean                            |
| loading   | Offers loading buttons that can show loading state and disable interactions | boolean                            |
| hidden    | For hidding the hidden                                                      | boolean                            |
| onClick   | onClick function will run on clicking                                       | function                           |
| size*     | For larger or smaller icon buttons, use the size prop                       | string                             |
| leftIcon  | React icon for left side                                                    | react icon                         |
| rightIcon | React icon for right side                                                   | react icon                         |
| type      | Type of the button                                                          | string - "button" "submit" "reset" |


## TextField

| Prop         | Description                                   | Type     |
| ------------ | --------------------------------------------- | -------- |
| type*        | Type of input -> text, password etc           | string   |
| placeholder* | Placeholder of the input field                | string   |
| title        | title of the input field                      | string   |
| name*        | name of the input field                       | string   |
| required     | is the field required to fill or not          | boolean  |
| label*       | label of the field                            | string   |
| value        | value of the field                            | string   | number    |
| onChange     | onChange event                                | function |
| error        | error.${name}.message from useForm()          | string   | undefined |
| register     | register from useForm()                       | any      |
| isSchema     | Is validation required for this input or not? | boolean  |


## Modal

| Prop           | Description                                 | Type                                          |
| -------------- | ------------------------------------------- | --------------------------------------------- |
| children*      | Options to display in dropdown              | ReactNode                                     |
| isModalOpen*   | State to check if the modal is open or not  | boolean (default - false)                     |
| setIsModalOpen | State update function to open / close modal | React.Dispatch<React.SetStateAction<boolean>> |



## Avatar

| Prop    | Description                    | Type                       |
| ------- | ------------------------------ | -------------------------- |
| letter* | First letter of the username   | string (length === 1)      |
| bgColor | Background color of the avatar | string (default = #6E40CE) |


## MenuDropdown

| Prop      | Description                                                  | Type      |
| --------- | ------------------------------------------------------------ | --------- |
| children* | Options to display in dropdown                               | ReactNode |
| icon      | Icon to display to open dropdown, Default is 3 vertical dots | ReactNode |


# 📃 Pages / Routes
1. HomePage - /
2. RoomPage (Chat room) - /room/:roomID