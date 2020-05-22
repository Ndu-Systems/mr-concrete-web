export interface Pending {
  Count: string;
}

export interface Completed {
  Count: string;
}

export interface Cancelled {
  Count: string;
}
export interface InProgress {
  Count: string;
}

export interface CounterModel {
  pending?: Pending;
  completed?: Completed;
  cancelled?: Cancelled;
  inProgress?: InProgress;
}
