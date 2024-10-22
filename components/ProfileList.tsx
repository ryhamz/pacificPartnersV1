import { useState } from 'react'
import { useSearch } from './search-context'
import { ProfileCard } from './ProfileCard'
import { ProfileModal } from './ProfileModal'

export function ProfileList() {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const { searchTerm } = useSearch();
  const profiles = [
    { id: 1, name: 'Maria Santos', age: 28, location: 'Manila', bio: 'I love exploring new places and trying local cuisines.' },
    { id: 2, name: 'Juan dela Cruz', age: 32, location: 'Cebu', bio: 'Passionate about music and outdoor activities.' },
    { id: 3, name: 'Ana Reyes', age: 25, location: 'Davao', bio: 'Aspiring photographer and nature enthusiast.' },
  ];

  const filteredProfiles = profiles.filter(profile =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.bio.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProfiles.map(profile => (
          <ProfileCard
            key={profile.id}
            profile={profile}
            onViewProfile={() => setSelectedProfile(profile)}
          />
        ))}
      </div>
      {selectedProfile && (
        <ProfileModal profile={selectedProfile} onClose={() => setSelectedProfile(null)} />
      )}
    </>
  );
}

