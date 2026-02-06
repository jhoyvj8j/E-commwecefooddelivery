import axios from 'axios'
import { useEffect } from 'react'
import { serverUrl } from '../App'
import { useSelector } from 'react-redux'

function useUpdateLocation() {
  const { userData } = useSelector(state => state.user)

  useEffect(() => {
    if (!userData) return; // ✅ user logged in check

    const updateLocation = async (lat, lon) => {
      try {
        const result = await axios.post(
          `${serverUrl}/api/user/update-location`,
          { lat, lon },
          { withCredentials: true }
        );
        console.log(result.data);
      } catch (err) {
        console.log("Location update failed", err);
      }
    };

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        updateLocation(pos.coords.latitude, pos.coords.longitude);
      },
      (error) => {
        console.log("Geolocation error:", error.message);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 5000
      }
    );

    // ✅ CLEANUP (MOST IMPORTANT)
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [userData]);
}

export default useUpdateLocation;
