
import { createSlice } from '@reduxjs/toolkit';

export const guildSlice = createSlice({
    name: 'guild',
    initialState: {
      infoGuild: {}
    },
    reducers: {
      saveGuild: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      },
      logoutGuild: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      }
    }
    
});

export const { saveGuild, logoutGuild } = guildSlice.actions;

export const guildData = (state) => state.guild;

export default guildSlice.reducer;