import React, {useState, useEffect} from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import URLs from '../config/URLs';
import Screen from '../components/Screen';
import io from "socket.io-client";
import axios from 'axios';

function TestScreen() {
    const [thoughts, setThoughts] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const fetchThoughts = async () => {
        try {
            const response = await axios.get(`${URLs.baseURL}/api/thought/getThoughts`)
            // console.log(response);

            if (response.data.success) {
                console.log(response.data.message);
                setThoughts(response.data.message);
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.log("Error with fetching thoughts: ", error);
            alert(
                "Error with fetching thought. Please check the console for more info."
            );
        }
    };

    useEffect(()=>{
        // socket.io connection
        const socket = io(`${URLs.socketURL}/api/socket`);
        // console.log(socket);

        socket.on("newThought", (thought) => {
            setThoughts([...thoughts, thought]);
        });

        socket.on("deletedThought", (id) => {
            const updatedThoughts = thoughts.filter((thought) => {
                return thought._id !== id;
            });

            setThoughts(updatedThoughts);
        });

        socket.on("thoughtsCleared", () => {
            setThoughts([]);
        });

        fetchThoughts();
    },[])

    const addThought = async () => {
        try {
            const response = await axios.post(
                `${URLs.baseURL}/api/thought/addThought`,
                {
                    name: name,
                    description: description,
                }
            );

            alert(response.data.message);
        } catch (error) {
            console.log("Error with adding thought: ", error);
            alert(
                "Error with adding thought. Please check the console for more info."
            );
        }
    };

    return (
        <Screen>
            <TextInput placeholder='Name' value={name} onChangeText={(value)=>setName(value)}/>
            <TextInput placeholder='Description' value={description} onChangeText={(value)=>setDescription(value)}/>
            {thoughts && <FlatList 
                data={thoughts}
                keyExtractor={thought => thought._id.toString()}
                renderItem={({ item }) => 
                    <AppText>
                        {item.name + ' ' + item.description}
                    </AppText>
                }
            />}
            {!thoughts && <AppText>Empty!</AppText>}
            <AppButton 
                title="Enter"
                onPress={()=>{
                    console.log(thoughts)
                    addThought();
                }}
                color="primary"
                textStyle={{fontSize: 16}}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({

})

export default TestScreen;