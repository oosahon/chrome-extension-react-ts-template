export const messageKeys = {
    print_job_info__linkedin: 'print-job-info__linkedin',
}


type LinkedInMessageKeys = 'post' | 'view' | 'read';

function doSomething(v: LinkedInMessageKeys) {
    console.log(v);
}


doSomething('post')