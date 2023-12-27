import { writable } from 'svelte/store';

const meetups = writable([]);

const meetupsStore = {
  subscribe: meetups.subscribe,
  setMeetups: (meetupArray) => meetups.set(meetupArray),
  addMeetup: (meetupData) => {
    meetups.update(items => [meetupData, ...items]);
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