**Experiences**

Here is the scenario, I have two branches, main and mod1. I edited the main's README file and the same as mod1's README file. Both edited the same line.

When merging it causes conflicts since both branches edited the same line and Git doesn't know which one to keep. I resolve the conflict by first, reviewing the lines and assess which ones to keep, or better to combine both. So I decided to combine the changes of main and mod1. 

From this experience, I learned that Git is a *cautious* tool that prioritizes data integrity over automation when it encounters ambiguous changes. I realized that merge conflicts are not "errors" to be feared, but rather prompts for collaboration and careful review of the codebase. To minimize these in the future, I will practice frequent syncing by pulling the latest changes from the main branch into my feature branches more often. I also learned that keeping commits small and focused on specific lines makes the manual resolution process much faster and less prone to human error.

**Reflection *Issue #40***

Staging is the middle ground where you "prepare" specific files for a snapshot, acting as a draft area known as the Index. Committing is the final act of saving that snapshot to the repository's permanent history, creating a unique ID (hash) that allows you to revert back to that exact state of the project at any time.

Git separates these steps to give developers control and flexibility over what goes into the project history. Instead of saving everything you've changed at once, the staging area allows you to curate your changes so that each commit represents a single, logical fix or feature rather than a messy pile of unrelated edits.

You would want to stage changes without committing when you have modified several files but only want to group a few of them into a specific commit, such as separating a "bug fix" from a "documentation update." It is also useful when you are in the middle of a task and want to "mark" a file as ready while you continue working on other files that aren't quite finished yet.
