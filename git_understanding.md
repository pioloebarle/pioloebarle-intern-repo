**Experiences**

Here is the scenario, I have two branches, main and mod1. I edited the main's README file and the same as mod1's README file. Both edited the same line.

When merging it causes conflicts since both branches edited the same line and Git doesn't know which one to keep. I resolve the conflict by first, reviewing the lines and assess which ones to keep, or better to combine both. So I decided to combine the changes of main and mod1. 

From this experience, I learned that Git is a *cautious* tool that prioritizes data integrity over automation when it encounters ambiguous changes. I realized that merge conflicts are not "errors" to be feared, but rather prompts for collaboration and careful review of the codebase. To minimize these in the future, I will practice frequent syncing by pulling the latest changes from the main branch into my feature branches more often. I also learned that keeping commits small and focused on specific lines makes the manual resolution process much faster and less prone to human error.
