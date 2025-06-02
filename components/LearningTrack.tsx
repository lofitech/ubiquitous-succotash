
import { learningPlan } from "@/data/learningPlan";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LearningTrack() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">🎓 Learning Program</h2>
      {learningPlan.map((item) => (
        <Card key={item.title}>
          <CardContent className="p-4 space-y-2">
            <h3 className="text-xl font-semibold">{item.phase}</h3>
            <p>{item.title}</p>
            <a href={item.link} target="_blank" className="underline text-blue-400">Open Course</a>
            <Button variant="solid">Mark as Done</Button>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
