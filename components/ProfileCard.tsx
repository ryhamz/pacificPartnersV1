import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function ProfileCard({ profile, onViewProfile }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{profile.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Age: {profile.age}</p>
        <p>Location: {profile.location}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={onViewProfile}>View Profile</Button>
      </CardFooter>
    </Card>
  );
}

