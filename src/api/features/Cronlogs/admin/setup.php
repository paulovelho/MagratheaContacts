<div class="card">
	<div class="card-header">
		Cron Job Code
		<div class="card-close" aria-label="Close" onclick="closeCard(this);">&times;</div>
	</div>
	<div class="card-body">
		Dreamhost implementation:<br />
		<a href="https://help.dreamhost.com/hc/en-us/articles/215088668-Create-a-cron-job">Click here for Dreamhost</a><br />
		<br />
		<hr /><br />
		<pre>
	crontab -e

# Example of job definition:
# .---------------- minute (0 - 59)
# |  .------------- hour (0 - 23)
# |  |  .---------- day of month (1 - 31)
# |  |  |  .------- month (1 - 12) OR jan,feb,mar,apr ...
# |  |  |  |  .---- day of week (0 - 6) (Sunday=0 or 7) OR sun,mon,tue,wed,thu,fri,sat
# |  |  |  |  |
# *  *  *  *  * user-name  command to be executed	
				</pre>

	</div>
</div>