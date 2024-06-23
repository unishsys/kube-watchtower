# Welcome to the kube-watchtower project!

**Contribution Guide**

### I. Before You Start

- Make sure you have a GitHub account and are familiar with Git.
- Read the [Code of Conduct](./code-of-conduct.md) and understand your responsibilities as a contributor.

### II. Setting Up Your Environment

- Install Go version 1.17 or higher: `go get -u golang.org/x/vgo`
- Set up your IDE or text editor for Go development.
- Make sure you have the necessary dependencies installed:

* `go mod tidy`

### III. Creating a Pull Request

1. **Fork this repository**: Click the "Fork" button on the top right corner of this page to create your own copy.
2. **Clone your forked repository**: Run `git clone https://github.com/<your-username>/kube-watchtower.git` (replace `<your-username>` with your actual GitHub username).
3. **Create a new branch**: Run `git checkout -b <feature-name>` (replace `<feature-name>` with a descriptive name for your feature).

### IV. Writing Code

- Follow the project's coding standards and best practices.
- Write tests for your code using Go's built-in testing package or a testing framework like testify.
- Use meaningful variable names, comments, and function names.

### VI. Submitting Your Pull Request

1. **Push your changes**: Run `git add . && git commit -m "Initial commit"` (or use a more descriptive commit message).
2. **Open a pull request**: Go back to your forked repository, click the "Pull requests" tab, and select "New pull request".
3. **Fill in the details**:

- Set the base branch to `master` (the default branch of this project).
- Set the compare branch to your new feature branch.
- Write a clear and concise title and description for your PR.

### VII. Review and Merge

1. **Code reviewers will review your changes**: Address any comments or concerns raised by code reviewers.
2. **Merge your pull request**: Once your PR is approved, merge it into the `master` branch.

That's it! Remember to always follow the project's coding standards and best practices when contributing. Happy coding!
