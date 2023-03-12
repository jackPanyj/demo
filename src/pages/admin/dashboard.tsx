import useFetch from '@/hooks/useFetch'
import { Button, Card, Empty, Spin } from 'antd';
import Meta from "antd/es/card/Meta";
import styles from './dashboard.module.less'
import { history } from "umi";


const Dashboard: React.FC = () => {
    const { loading, data: list } = useFetch('/api/all')

    return (
        <div className={styles.dashboard}>
            <div className={styles.title}>Dashboard</div>

            <div className={styles.home}>
                <Button type='link' onClick={() => history.push('/')}>Go Home</Button>
            </div>
            <div className={styles.content}>
                {
                    loading && <div className={styles.center}><Spin /></div>
                }

                {
                    list.length === 0 && <div className={styles.center}><Empty /></div>
                }

                {list.length > 0 && (
                    <div className={styles.list}>
                        {
                            list.map(item => {
                                return (
                                    <Card
                                        key={item.id}
                                        hoverable
                                        style={{ width: 240, height: 300 }}
                                        cover={<img alt={item.name} src={item.govPicture} />}
                                    >
                                        <Meta title={item.name} description={item.govNumber} />
                                    </Card>

                                )
                            })
                        }
                    </div>
                )}
            </div>

        </div>
    )
}

export default Dashboard