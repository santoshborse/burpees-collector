#

curl -k -X POST  \
-H 'Content-Type: application/json' \
-d '{ "sessionCount": 0, "podName": "speech-p5" }' \
http://metrics-collector/api/v1/metrics


 

curl -X POST  \
-H 'Content-Type: application/json' \
-d '{ "sessionCount": 30, "podName": "speech-p2" }' \
http://localhost:8085/api/v1/metrics


curl -X POST  \
-H 'Content-Type: application/json' \
-d '{ "sessionCount": 11, "podName": "speech-p3" }' \
http://localhost:8085/api/v1/metrics


curl -X POST  \
-H 'Content-Type: application/json' \
-d '{  "podName": "speech-p1" }' \
http://localhost:8085/api/v1/metrics
 

curl -X GET  \
http://localhost:9090/api/v1/metrics


BASE_URL=speech-operator-controller-manager-metrics-service.zen.svc.cluster.local:9002

curl -X GET  \
$BASE_URL/api/v1/metrics


curl -X POST  \
-H 'Content-Type: application/json' \
-d '{ "sessionCount": 11, "podName": "speech-p3" }' \
$BASE_URL/api/v1/metrics