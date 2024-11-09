document.addEventListener('DOMContentLoaded', () => {
    const workoutForm = document.getElementById('workout-form');
    const exerciseNameInput = document.getElementById('exercise-name');
    const exerciseDurationInput = document.getElementById('exercise-duration');
    const workoutList = document.getElementById('workout-list');
    const savePlanButton = document.getElementById('save-plan');
    const messageDiv = document.getElementById('message');

    workoutForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const exerciseName = exerciseNameInput.value;
        const exerciseDuration = exerciseDurationInput.value;

        addExerciseToDOM(exerciseName, exerciseDuration);
        exerciseNameInput.value = '';
        exerciseDurationInput.value = '';
    });

    savePlanButton.addEventListener('click', () => {
        const exercises = Array.from(workoutList.children).map((item) => {
            const exerciseName = item.querySelector('.exercise-name').textContent;
            const exerciseDuration = item.querySelector('.exercise-duration').textContent;
            return { exerciseName, exerciseDuration };
        });

        localStorage.setItem('workoutPlan', JSON.stringify(exercises));
        messageDiv.textContent = 'Workout plan saved!';
    });

    function addExerciseToDOM(exerciseName, exerciseDuration) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="exercise-name">${exerciseName}</span>
            <span class="exercise-duration">${exerciseDuration} minutes</span>
            <button>Delete</button>
        `;

        const deleteButton = li.querySelector('button');
        deleteButton.addEventListener('click', () => {
            workoutList.removeChild(li);
        });

        workoutList.appendChild(li);
    }

    // Load saved workout plan
    (function loadWorkoutPlan() {
        const savedPlan = JSON.parse(localStorage.getItem('workoutPlan') || '[]');
        savedPlan.forEach((exercise) => {
            addExerciseToDOM(exercise.exerciseName, exercise.exerciseDuration);
        });
    })();
});
