import { writable } from 'svelte/store';

const meetups = writable([
  {
    id: 'm1',
    title: 'Coding Bootcamp',
    subtitle: 'Learn to code in 2 hours',
    description: 'In this meetup, we will have some exports teach you how to code!',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/First_Caffe_Nero_Sutton_Surrey_London.JPG/800px-First_Caffe_Nero_Sutton_Surrey_London.JPG',
    address: '27th Nerd Road, 32523 New York',
    contactEmail: 'code@test.com',
    isFavorite: false
  },
  {
    id: 'm2',
    title: 'Swim Together',
    subtitle: 'Let\'s go for some swimming',
    description: 'We will simply swim some rounds!',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Olympic_Swimming_Pool_-_Fast_Lane.JPG',
    address: '27th Nerd Road, 32523 New York',
    contactEmail: 'seim@test.com',
    isFavorite: false
  }
]);

const meetupsStore = {
  subscribe: meetups.subscribe,
  addMeetup: (meetupData) => {
    const newMeetup = {
      ...meetupData,
      id: Math.random().toString(),
      isFavorite: false
    };
    meetups.update(items => [newMeetup, ...items]);
  },
  updateMeetup: (id, meetupData) => {
    meetups.update(items => {
      const meetupIndex = items.findIndex(item => item.id === id);
      const updatedMeetup = { ...items[meetupIndex], ...meetupData };
      const updatedMeetups = [...items];
      updatedMeetups[meetupIndex] = updatedMeetup;
      return updatedMeetups;
    });
  },
  removeMeetup: (id) => {
    meetups.update(items => items.filter(item => item.id !== id));
  },
  toggleFavorite: (id) => {
    meetups.update(items => {
      const updatedMeetup = { ...items.find(item => item.id === id) };
      updatedMeetup.isFavorite = !updatedMeetup.isFavorite;
      const meetupIndex = items.findIndex(item => item.id === id);
      const updatedMeetups = [...items];
      updatedMeetups[meetupIndex] = updatedMeetup;
      return updatedMeetups;
    });
  }
}

export default meetupsStore;