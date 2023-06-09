import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function JokesFormSkeleton() {
  return (
    <>
      <div className="mb-4 flex w-full justify-between sm:mt-0 sm:w-6/12">
        <Skeleton className="h-[40px] w-[92px] rounded-md" />
        <Skeleton className="h-[40px] w-[92px] rounded-md" />
      </div>
      <Card className="w-full sm:w-6/12">
        <CardContent className="p-6">
          <div className="w-full justify-start space-y-6 text-left">
            <div className="space-y-2">
              <Skeleton className="h-[17px] w-[30px]" />
              <Skeleton className="h-[40px] w-full rounded-md" />
              <Skeleton className="h-[20px] w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-[17px] w-[30px]" />
              <Skeleton className="h-[40px] w-full rounded-md" />
              <Skeleton className="h-[20px] w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-[17px] w-[30px]" />
              <Skeleton className="h-[40px] w-full rounded-md" />
              <Skeleton className="h-[20px] w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-[17px] w-[30px]" />
              <Skeleton className="h-[40px] w-full rounded-md" />
              <Skeleton className="h-[20px] w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-[17px] w-[30px]" />
              <Skeleton className="h-[40px] w-full rounded-md" />
              <Skeleton className="h-[20px] w-full" />
            </div>
            <div className="flex justify-end">
			<Skeleton className="h-[40px] w-[85px]" />
			</div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
