import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../services/workout.service'; 
import { Workout } from '../models/workout.model';

@Component({
  selector: 'app-my-workouts',
  templateUrl: './my-workouts.component.html',
  styleUrls: ['./my-workouts.component.css'],
})
export class WorkoutComponent implements OnInit {
  workouts: Workout[] = [];
  filteredWorkouts: Workout[] = [];  
  newWorkout: Workout = { date: new Date(), time: '', name: '', count: 0, comments: '' };  
  editMode: boolean = false;
  currentWorkoutId: string | null = null; 

  
  searchText: string = '';
  sortCriteria: string = 'date'; 

  constructor(private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.getWorkouts();
  }

  // Get all workouts
  getWorkouts(): void {
    this.workoutService.getWorkouts().subscribe((data: Workout[]) => {
      this.workouts = data;
      this.filteredWorkouts = [...this.workouts];  
    });
  }

  // Add new workout
  addWorkout(): void {
    this.workoutService.addWorkout(this.newWorkout).subscribe((data) => {
      this.workouts.push(data); 
      this.filteredWorkouts.push(data); 
      this.newWorkout = { date: new Date(), time: '', name: '', count: 0, comments: '' }; 
    });
  }

  // Edit workout
  editWorkout(workout: Workout): void {
    this.editMode = true;
    this.currentWorkoutId = workout._id ?? null; 
    this.newWorkout = { ...workout }; 
  }

  // Update workout
  updateWorkout(): void {
    if (this.currentWorkoutId) {
      this.workoutService
        .updateWorkout(this.currentWorkoutId, this.newWorkout)
        .subscribe((updatedWorkout) => {
          const index = this.workouts.findIndex(
            (workout) => workout._id === this.currentWorkoutId
          );
          if (index !== -1) {
            this.workouts[index] = updatedWorkout; 
            this.filteredWorkouts[index] = updatedWorkout; 
          }
          this.cancelEdit(); 
        });
    }
  }

  // Delete workout
  deleteWorkout(id: string | undefined): void {
    if (id) { 
      this.workoutService.deleteWorkout(id).subscribe(() => {
        this.workouts = this.workouts.filter((workout) => workout._id !== id); 
        this.filteredWorkouts = this.filteredWorkouts.filter((workout) => workout._id !== id); 
      });
    }
  }

  // Cancel edit mode and reset form
  cancelEdit(): void {
    this.editMode = false;
    this.newWorkout = { date: new Date(), time: '', name: '', count: 0, comments: '' }; 
    this.currentWorkoutId = null;
  }

  // Search workouts by name
  searchWorkouts(): void {
    this.filteredWorkouts = this.workouts.filter(workout =>
      workout.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  // Sort workouts by selected criteria
  sortWorkouts(): void {
    if (this.sortCriteria === 'date') {
      this.filteredWorkouts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (this.sortCriteria === 'count') {
      this.filteredWorkouts.sort((a, b) => a.count - b.count);
    }
  }
}
