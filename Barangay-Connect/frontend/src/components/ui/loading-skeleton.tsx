import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="space-y-4 p-6">
      <Skeleton className="h-8 w-[250px]" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-[120px] rounded-lg" />
        ))}
      </div>
      <Skeleton className="h-[300px] rounded-lg" />
    </div>
  );
}

export function NotificationsSkeleton() {
  return (
    <div className="space-y-4 p-6">
      <Skeleton className="h-8 w-[200px]" />
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-[80px] rounded-lg" />
      ))}
    </div>
  );
}

export function PollsSkeleton() {
  return (
    <div className="space-y-4 p-6">
      <Skeleton className="h-8 w-[200px]" />
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-[150px] rounded-lg" />
      ))}
    </div>
  );
}

export function AnnouncementsSkeleton() {
  return (
    <div className="space-y-4 p-6">
      <Skeleton className="h-8 w-[250px]" />
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-[100px] rounded-lg" />
      ))}
    </div>
  );
}
