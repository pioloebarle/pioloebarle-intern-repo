# Milestone 3 - Learn Git

## Experiences

Here is the scenario, I have two branches, main and mod1. I edited the main's README file and the same as mod1's README file. Both edited the same line.

When merging it causes conflicts since both branches edited the same line and Git doesn't know which one to keep. I resolve the conflict by first, reviewing the lines and assess which ones to keep, or better to combine both. So I decided to combine the changes of main and mod1.

From this experience, I learned that Git is a *cautious* tool that prioritizes data integrity over automation when it encounters ambiguous changes. I realized that merge conflicts are not "errors" to be feared, but rather prompts for collaboration and careful review of the codebase. To minimize these in the future, I will practice frequent syncing by pulling the latest changes from the main branch into my feature branches more often. I also learned that keeping commits small and focused on specific lines makes the manual resolution process much faster and less prone to human error.

## Reflection *Issue #40*: Git concept: staging vs committing

Staging is the middle ground where you "prepare" specific files for a snapshot, acting as a draft area known as the Index. Committing is the final act of saving that snapshot to the repository's permanent history, creating a unique ID (hash) that allows you to revert back to that exact state of the project at any time.

Git separates these steps to give developers control and flexibility over what goes into the project history. Instead of saving everything you've changed at once, the staging area allows you to curate your changes so that each commit represents a single, logical fix or feature rather than a messy pile of unrelated edits.

You would want to stage changes without committing when you have modified several files but only want to group a few of them into a specific commit, such as separating a "bug fix" from a "documentation update." It is also useful when you are in the middle of a task and want to "mark" a file as ready while you continue working on other files that aren't quite finished yet.

## Reflection *Issue #41*: Branching & Team Collaboration

Pushing directly to *main* is risky because it bypasses the *safety net*. The *main* branch should always represent a stable version of the codebase, and pushing directly to it can introduce untested changes that may break the build or cause bugs for other developers. It also disrupts the collaborative workflow, as other team members won't have the chance to review and approve changes before they become part of the *main* codebase.

Branches acts as a *sandbox* for development. By creating a separate branch for my work, I can submit a **Pull Request (PR)** for review and approval before merging into *main*. This ensures that changes are vetted by other developers, maintaining code quality and preventing disruptions to the main branch.

When two people edit the same part of the same file on different branches, Git cannot automatically determine which change to keep during a merge, resulting in a **Merge Conflict**. This requires manual intervention to review the conflicting changes and decide how to resolve them, ensuring that the final code is correct and functional.

## Reflection *Issue #43*: Advanced Git Commands & When to Use Them

`git checkout main -- <file>`

**What it does:** IT pulls the version of a specific file from the *main* branch and overwrites the current version in your current branch.

**Real Project Use Case:** Use this if you’ve made a mess of a specific file (like a config file) and you just want to "reset" that one file back to the stable version from *main* without losing all your other work in the current branch.

`git cherry-pick <commit>`

**What it does:** It allows you to grab a single, specific commit from one branch and apply it to another without merging the entire branch.

**Real Project Use Case:** If a teammate fixed a critical bug on a different feature branch, you can "cherry-pick" just that bug fix into your branch immediately, rather than waiting for their whole feature to be finished and merged.

`git log`

**What it does:** It displays the history of all commits in the repository, showing the author, date, and commit message.

**Real Project Use Case:** I use this to trace the evolution of a feature or to find a specific "commit hash" (the unique ID) if I need to revert to a previous version of the project.

`git blame <file>`

**What it does:** It shows a line-by-line breakdown of a file, identifying exactly who modified each line and in which commit.

**Real Project Use Case:** This is incredibly useful for "context hunting." If I see a confusing line of code in the mobile app, I use `git blame` to see who wrote it and when. This allows me to ask that specific developer for the reasoning behind that logic.

I was surprised by how surgical **Cherry-picking** is. I always thought you had to merge everything or nothing, but the ability to pull just one specific fix is a huge time-saver. I also found git blame to be less about "blaming" people and more about understanding the history of the code—it's like having a time machine for every single line of code in the repository.

## Reflection *Issue #44*: Understand git bisect

`git bisect` is a command that performs a binary search through your commit history to find the  "bad" commit that introduced a bug. You tell Git one "good" point in the past where the code worked, and one "bad" point where the bug is present. Git then automatically checkouts a commit in the middle and asks you if it's good or bad. It continues halving the range until the specific commit that caused the issue is isolated.

I would use `git bisect` when I discover a bug that wasn't there a week ago, but I have no idea which of the 50 commits made during that week caused it. For example, if the **Focus Bear** mobile app suddenly starts crashing on the login screen, and I know it worked perfectly three days ago, `git bisect` will help me find the exact line change that caused the crash without me having to manually read through hundreds of lines of code.

Manually reviewing commits is a **linear search**, this takes a long time when you have alot of commits. `git bisect` uses a **binary search** method, which is much faster because it cuts the number of commits to check in half with each step. This makes it an essential tool for quickly diagnosing and fixing bugs in a large codebase.

### Git Bisect Hands-On Scenario

**Scenario Setup:**
I created a simple JavaScript math library (`math.js`) with multiple commits to practice git bisect in the `milestones/3-Learn-Git/` folder.

**Commits Made:**
1. **Commit 1:** "Add add function" - Added `add()` function, working correctly
2. **Commit 2:** "Add subtract function" - Added `subtract()` function, working correctly  
3. **Commit 3:** "Add multiply function" - Added `multiply()` function, working correctly
4. **Commit 4:** "Update math functions" - **BUG INTRODUCED**: Changed `subtract(a, b)` from `return a - b` to `return a + b`
5. **Commit 5:** "Add divide function" - Added `divide()` function, bug still present

**Bug Discovered:**  
The `subtract(10, 5)` function was returning `15` instead of the expected `5`.

**Using Git Bisect to Find the Bug:**
I ran the following commands to locate the exact commit that introduced the bug:

```bash
git bisect start          # Start the bisect process
git bisect bad            # Mark current state as bad (bug exists)
git bisect good HEAD~4    # Mark 4 commits ago as good (worked fine)
# Git automatically checks out the middle commit
# At each step, I tested the subtract function to see if it worked
git bisect good/bad       # Marked each commit based on test results
```

**Result:**
Git bisect identified **Commit 3** ("Add multiply function") with hash `315648392104643da800a4ff0a3b64a23ee3d355` as the first bad commit. This process took only 1-2 test steps instead of manually reviewing all 5 commits, demonstrating the efficiency of binary search over linear search.

![Git Bisect Terminal Session](git%20bisect.png)

## Reflection *Issue #45*: Writing Meaningful Commit Messages

A good commit message should be concise yet descriptive, and follow the **Conventional Commits** format. A high-quality message is usually split into a short summary (50 characters or less) that describes the change, followed by a more detailed body if necessary. It should also include the type of change (e.g., `feat`, `fix`, `docs`, `style`, `refactor`) and reference any related issues or pull requests.

Clear messages act as a communication tool for the team. When a colleague (or a senior reviewer) looks at the project history, they can quickly understand the purpose of each change without having to read the actual code. This makes Code Reviews faster and helps the team understand the "intent" behind a specific logic change, especially when working on complex mobile features.

Poor commit messages can lead to confusion and make it difficult for others to trace the project history. If there is a bug introduced, it becomes harder to identify which commit caused it, especially if the message is vague like "fix stuff" or "update code." This can slow down debugging and make collaboration more frustrating, as team members may have to spend extra time deciphering the purpose of each commit.

## Reflection *Issue #46*: Pull Requests

Pull Requests (PRs) are a critical part of modern software engineering because they move the "trust" from a single person to the entire team. In a project like **React**, PRs ensure that every change is scrutinized for performance, security, and accessibility before it becomes part of the main codebase. They provide a historical record of why a decision was made, which is invaluable for future developers who may need to understand the rationale behind a specific implementation.

A well-structured PR should include a clear description of the change, the motivation behind it, and any relevant screenshots or test results. It should also be small and focused on a single issue or feature to make it easier for reviewers to understand and provide feedback.

In reviewing the React repository, I learned that high-scale teams rely heavily on **Automation and Strict Labeling**. I observed three key things:

* Automation First: Every PR triggers a suite of automated "Checks" (like CircleCI or GitHub Actions). If these fail, the PR is often ignored until the author fixes the linting or test errors.
* Explicit Communication: Maintainers like Sophie Alpert or Dan Abramov often ask for "reproducible examples." This taught me that as a junior developer, I should always provide enough info for my reviewer to recreate my scenario.
* Labeling as Triage: React uses specific labels (e.g., `Type: Bug`, `Component: Developer Tools`, `CLA Signed`) to manage thousands of contributors. This organization is what allows a small core team to manage a massive community.
        