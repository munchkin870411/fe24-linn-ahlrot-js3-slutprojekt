import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

export default function Loading() {
  return LoadingSpinner({ fullScreen: true, message: "Loading country details..." });
}