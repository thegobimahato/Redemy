import { features } from "@/data/features";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FeaturesCard = () => {
  return (
    <section className="mb-32 grid grid-cols-1 gap-6 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
      {features.map((feature, index) => (
        <Card
          key={index}
          className="border-border/40 bg-card/60 dark:border-border/20 dark:bg-background/60 transition-all hover:shadow-xl"
        >
          <CardHeader className="space-y-3">
            <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-xl">
              <feature.icon className="h-6 w-6" />
            </div>

            <CardTitle className="text-lg font-semibold">
              {feature.title}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {feature.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </section>
  );
};

export default FeaturesCard;
