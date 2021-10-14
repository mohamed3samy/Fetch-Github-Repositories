let theInput = document.querySelector(".get-repos input"),
	getButton = document.querySelector(".get-button"),
	reposData = document.querySelector(".show-data");

getButton.addEventListener("click", getRepos);
function getRepos() {
	if (theInput.value === "") {
		reposData.innerHTML = `<span>Please Write Github Username.<span>`;
	} else {
		fetch(`https://api.github.com/users/${theInput.value}/repos`)
			.then((response) => response.json())

			.then((repos) => {
				reposData.innerHTML = "";

				repos.forEach((repo) => {
					let mainDiv = document.createElement("div"),
						repoName = document.createElement("p"),
						repoNameText = document.createTextNode(repo.name);

					repoName.className = "repo-name";
					repoName.appendChild(repoNameText);
					mainDiv.appendChild(repoName);

					let theUrl = document.createElement("a"),
						theUrlText = document.createTextNode("Visit");

					theUrl.className = "repo-link";
					theUrl.appendChild(theUrlText);

					// Add the href to the URL
					theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;

					theUrl.setAttribute("target", "_blank");

					mainDiv.appendChild(theUrl);

					// Create stars Span
					let stars = document.createElement("span");
					stars.className = "stars";

					// Create Star Text
					let starsText = document.createTextNode(
						`Stars: ${repo.stargazers_count}`
					);

					stars.appendChild(starsText);

					mainDiv.appendChild(stars);
					mainDiv.className = "repo-box";
					reposData.appendChild(mainDiv);
				});
			});
	}
}
